import React, { ReactNode } from 'react';

import { getSession } from '@/api/auth.api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeftEndOnRectangleIcon, BellIcon, BookOpenIcon, Cog6ToothIcon, EnvelopeIcon, HeartIcon, ShoppingCartIcon, UserIcon } from '@heroicons/react/24/outline';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import env from '@/constant/env';
import { HistoryIcon, HomeIcon, UserCircle } from 'lucide-react';
import ProtectedElement from '@/components/layout/protected-element';
import Navigation from '@/app/Navigation';

type Tab = {
  icon: ReactNode;
  action: ReactNode;
}[][];

const tabs: Tab = [
  [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/">
          Trang chủ
        </Link>
      ),
    },
  ],
  [
    {
      icon: <UserIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/profile">
          Thông tin tài khoản
        </Link>
      ),
    },
    {
      icon: <ShoppingCartIcon className="w-5 h-5" />,
      action: 'Đơn của bạn',
    },
  ],
  [
    {
      icon: <BookOpenIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/my-post">
          Bài đăng của bạn
        </Link>
      ),
    },
    {
      icon: <HeartIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/favorite-post">
          Bài đăng yêu thích
        </Link>
      ),
    },
    {
      icon: <HistoryIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href="/post-browsing-history">
          Lịch sử truy cập
        </Link>
      ),
    },
  ],
  [
    {
      icon: <Cog6ToothIcon className="w-5 h-5" />,
      action: 'Cài đặt',
    },
  ],
  [
    {
      icon: <ArrowLeftEndOnRectangleIcon className="w-5 h-5" />,
      action: (
        <Link className="w-full" href={`${env.url.backend_url}/auth/logout`}>
          Đăng xuất
        </Link>
      ),
    },
  ],
];

type Props = {
  className?: string;
};

async function Header({ className }: Props) {
  const user = await getSession();

  return (
    <div className="flex items-center gap-x-5 sticky w-full top-4 py-2 px-4 rounded-2xl shadow-3xl z-40 bg-white">
      <Link className="text-3xl font-extrabold" href="/">
        NiceWork
      </Link>
      <Navigation />

      <div className="flex w-full items-center gap-2">
        <div className="absolute w-full flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input className="block w-full h-10 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bạn đang tìm kiếm những gì ?" required />
      </div>
      <BellIcon className="w-12 h-12" />
      <EnvelopeIcon className="w-12 h-12" />
      {user ? (
        <Sheet>
          <SheetTrigger className="cursor-pointer" asChild>
            <Avatar className="h-9">
              <AvatarImage className="rounded-full h-9 w-9" src={user.avatar + '.png'} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </SheetTrigger>
          <SheetContent className="space-y-2 p-2">
            <div className="flex gap-2 items-end">
              <Avatar>
                <AvatarImage className="rounded-full h-10 w-10" src={user.avatar + '.png'} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>{user.username}</span>
            </div>
            <div className="pt-6">
              <ProtectedElement session={user} all={['ADMIN']}>
                <Link className="flex gap-2 hover:bg-blue-500 hover:text-white p-2 rounded-md" href="/admin">
                  <UserCircle className="w-5 h-5" />
                  Quản trị
                </Link>
                <div className="border-b pt-1 mb-1 w-full" />
              </ProtectedElement>
              {tabs.map((tab, index) => (
                <React.Fragment key={index}>
                  {tab.map(({ action, icon }, index) => (
                    <div className="flex gap-2 hover:bg-blue-500 hover:text-white p-2 rounded-md" key={index}>
                      {icon}
                      {action}
                    </div>
                  ))}
                  <div className="border-b pt-1 mb-1 w-full" />
                </React.Fragment>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Link className="p-2 text-nowrap" href="/account/login">
          Đăng nhập
        </Link>
      )}
    </div>
  );
}

export default Header;
