import { getSession } from '@/api/auth.api';
import Header from '@/app/Header';
import ProtectedRoute from '@/components/layout/protected-route';
import React, { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <ProtectedRoute session={session} all={['USER']}>
      <div className="h-full flex flex-col px-4">
        <Header className="p-4" />
        {children}
      </div>
    </ProtectedRoute>
  );
}
