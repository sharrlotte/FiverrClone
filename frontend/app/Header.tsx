
import React from 'react';

import Link from 'next/link';
import Navigation from '@/app/Navigation';
import UserSheet from '@/app/UserSheet';
import { BellIcon } from 'lucide-react';
import SearchBar from '@/app/SearchBar';

type Props = {
  className?: string;
};

function Header({}: Props) {
  return (
    <div className="pt-4 sticky top-0 z-10 backdrop-blur-lg rounded-b-2xl">
      <div className="flex items-center gap-x-5 bg-white sticky w-full top-4 py-2 px-4 rounded-2xl shadow-3xl z-40 h-20">
        <Link className="text-3xl font-extrabold" href="/">
          NiceWork
        </Link>
        <Navigation />
        <SearchBar />
        <div className="flex gap-2 justify-center items-center">
          <BellIcon className="w-6 h-6" />
          <UserSheet />
        </div>
      </div>
    </div>
  );
}

export default Header;
