import { UserRole } from '@/constant/enum';
import { Session } from '@/schema/user.schema';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  any?: UserRole[];
  all?: UserRole[];
  session: Session | null;
};

function NoPermission() {
  return <span className="fixed inset-0 flex justify-center items-center text-2xl">You don have permission to access this page</span>;
}

export default async function ProtectedRoute({ all, any, children, session }: Props) {
  if (!session?.roles)
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        Please login to continue
        <Link className="min-w-[100px]" title="login" href="/account/login" />
      </div>
    );

  const roles = session.roles;

  const pred = [all ? all.every((role) => roles.includes(role)) : true, any ? any.some((role) => roles.includes(role)) : true].every(Boolean);

  if (!pred) {
    return <NoPermission />;
  }

  return <>{children}</>;
}
