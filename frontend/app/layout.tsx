import type { Metadata } from 'next';
import { Rubik as Font } from 'next/font/google';
import QueryProvider from './query-provider';

import { Toaster } from '@/components/ui/toaster';
import NextTopLoader from 'nextjs-toploader';

import './globals.css';

const inter = Font({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <body className={inter.className}>
        <Toaster />
        <NextTopLoader height={2} showSpinner={false} color="blue" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
