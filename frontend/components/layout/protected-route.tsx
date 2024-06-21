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
      <span className="font-bold text-2xl">Bạn không có quyền để truy cập trang này</span>
      <Link className="min-w-[100px] bg-blue-500 text-white border p-2 rounded-md" title="home" href="/">
        Về trang chủ{' '}
      </Link>
    </div>
  );
}

function LoginToContinue() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <h1>Chào mừng đến với NiceWorks</h1>
      <span>Vui lòng đăng nhập để tiếp tục</span>
      <div className="grid grid-cols-2 gap-2">
        <Link className="min-w-[100px] border p-2 rounded-md bg-blue-500 text-white text-center" title="login" href="/account/login">
          Đăng nhập
        </Link>
        <Link className="min-w-[100px] border p-2 rounded-md border-border text-center" title="home" href="/">
          Quay lại
        </Link>
      </div>
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
