'use client';

import React, { ReactNode } from 'react';

import { Filter, hasAccess } from '@/lib/utils';
import { useSession } from '@/context/SessionContext';

type Props = {
  filter: Filter;
  children: ReactNode;
};

function NoPermission() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <p>Không có quyền truy cập</p>
    </div>
  );
}

export default function ProtectedRoute({ filter, children }: Props) {
  const { session, state } = useSession();

  if (state === 'loading') return <p>Đang tải...</p>;

  if (!session || session.roles === undefined || session.roles === null) return <p>Đăng nhập để tếp tục</p>;

  const canAccess = hasAccess(session, filter);

  if (!canAccess) {
    console.error(filter, session);
    return <NoPermission />;
  }

  return children;
}
