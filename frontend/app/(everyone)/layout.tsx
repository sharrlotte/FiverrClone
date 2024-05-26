import { getSession } from '@/api/auth.api';
import Header from '@/app/Header';
import ProtectedRoute from '@/components/layout/protected-route';
import React, { ReactNode } from 'react';

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <ProtectedRoute session={session} all={['USER']}>
      <div className="divide-y-2 h-full flex flex-col overflow-hidden">
        <Header className="p-4" />
        {children}
      </div>
    </ProtectedRoute>
  );
}
