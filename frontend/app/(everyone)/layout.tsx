'use client';
import Header from '@/app/Header';
import ProtectedRoute from '@/components/layout/protected-route';
import React, { ReactNode, useEffect } from 'react';
import { useSession } from '@/context/SessionContext';
import { useRouter } from 'next/navigation';

const checkFirstVisit = () => {
  if (typeof window !== 'undefined') {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      localStorage.setItem('hasVisited', 'true');
      return true;
    }
    return false;
  }
  return false;
};

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    if (checkFirstVisit()) {
      router.replace('/promopage');
    }
  }, []);

  const { session } = useSession();

  return (
    <ProtectedRoute session={session} all={['USER']}>
      <div className="h-full flex flex-col px-4">
        <Header className="p-4" />
        {children}
      </div>
    </ProtectedRoute>
  );
}
