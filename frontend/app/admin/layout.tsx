import { getSession } from '@/api/auth.api';
import ProtectedRoute from '@/components/layout/protected-route';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LinkType = {
  links: { name: string; link: string; href: string }[];
  artist: string;
  alt: string;
};

const links: LinkType[] = [
  {
    links: [{ name: 'Trang chủ', link: '/image/total.svg', href: '/admin/home' }],
    alt: 'home',
    artist: '',
  },
  {
    links: [
      { name: 'Số Liệu', link: '/image/chart.svg', href: '/admin/chart' },
      { name: 'Người Dùng', link: '/image/user.svg', href: '/admin/users' },
      {
        name: 'Thể Loại',
        link: '/image/tagcategory.svg',
        href: '/admin/skill-category',
      },
    ],
    alt: 'home',
    artist: 'Quản Lý',
  },
  {
    links: [
      { name: 'Báo cáo', link: '/image/report.svg', href: '/admin/report' },
      { name: 'Bình luận', link: '/image/chat.svg', href: '/admin/comment' },
      { name: 'Bài đăng', link: '/image/post.svg', href: '/admin/post' },
    ],
    alt: 'home',
    artist: 'Kiểm duyệt',
  },
];

export default async function Page({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <ProtectedRoute session={session} all={['ADMIN']}>
      <div className="flex divide-x h-full">
        <div className="w-1/6 h-full justify-between flex flex-col space-y-20">
          <div className="">
            <div className="items-center p-10 ">icons</div>
            {links.map(({ links, alt, artist }, index) => (
              <div className="w-full flex justify-start gap-2 p-2 flex-col" key={index}>
                <div className="font-bold">{artist}</div>

                {links.map(({ link, name, href }) => (
                  <Link key={href} href={href} className="flex gap-2 items-center">
                    <Image src={link} alt={alt} height={24} width={24} />
                    <div className="text-sm">{name}</div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col  gap-2 pb-4">
            <Separator className="my-4"></Separator>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-2 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Setting
            </Button>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-2 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              Logout
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full p-6 ">
          <div className="flex w-full">
            <div className="flex-auto w-1/2 ">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input className="block w-full  p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bạn đang tìm kiếm những gì ?" required />
                <button className=" text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </div>

            <Button variant="ghost">
              <svg width="23" height="19" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.494 6.818a6.506 6.506 0 0 1 13.012 0v2.006c0 .504.2.988.557 1.345l1.492 1.492a3.869 3.869 0 0 1 1.133 2.735 2.11 2.11 0 0 1-2.11 2.11H2.422a2.11 2.11 0 0 1-2.11-2.11c0-1.026.408-2.01 1.134-2.735l1.491-1.492c.357-.357.557-.84.557-1.345V6.818Zm-1.307 7.578c0 .13.106.235.235.235h15.156c.13 0 .235-.105.235-.235 0-.529-.21-1.036-.584-1.41l-1.492-1.491a3.778 3.778 0 0 1-1.106-2.671V6.818a4.63 4.63 0 1 0-9.262 0v2.006a3.778 3.778 0 0 1-1.106 2.671L2.77 12.987c-.373.373-.583.88-.583 1.41Zm4.49 4.354c0-.517.419-.937.937-.937h4.772a.938.938 0 0 1 0 1.875H7.614a.937.937 0 0 1-.938-.938Z"></path>
              </svg>
            </Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
