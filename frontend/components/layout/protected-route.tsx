import { UserRole } from '@/constant/enum';
import { Session } from '@/schema/user.schema';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  any?: UserRole[];
  all?: UserRole[];
  session: Session | null;
  alt?: ReactNode;
};

function NoPermission() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <span className="font-bold text-2xl">You don have permission to access this page</span>
      <Link className="min-w-[100px] border p-2 rounded-md" title="home" href="/">
        Về trang chủ{' '}
      </Link>
    </div>
  );
}

function LoginToContinue() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <span className="text-2xl font-bold">Vui lòng đăng nhập để tiếp tục</span>
      <Link className="min-w-[100px] border p-2 rounded-md" title="login" href="/account/login">
        Đến trang đăng nhập
      </Link>
      <Link className="min-w-[100px] border p-2 rounded-md" title="home" href="/">
        Về trang chủ
      </Link>
    </div>
  );
}

export default function ProtectedRoute({ all, any, children, session, alt }: Props) {
  if (!session?.roles) {
    if (alt) {
      return alt;
    }

    return <LoginToContinue />;
  }

  const roles = session.roles;

  const pred = [all ? all.every((role) => roles.includes(role)) : true, any ? any.some((role) => roles.includes(role)) : true].every(Boolean);

  if (!pred) {
    return <NoPermission />;
  }

  return <>{children}</>;
}
