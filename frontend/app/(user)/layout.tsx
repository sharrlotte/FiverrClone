import Header from '@/app/Header';
import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="divide-y-2 h-full flex flex-col">
      <Header className="p-4" />
      {children}
    </div>
  );
}
