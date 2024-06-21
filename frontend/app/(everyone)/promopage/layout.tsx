'use client';

import { useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '@/app/Footer';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    });
  });

  return (
    <div className="w-full h-full overflow-y-auto">
      <main className="grow">{children}</main>
      <Footer />
    </div>
  );
}
