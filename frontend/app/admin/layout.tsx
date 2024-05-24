import { getSession } from '@/api/auth.api';
import NavLink from '@/app/admin/NavLink';
import Header from '@/app/Header';
import ProtectedRoute from '@/components/layout/protected-route';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import { Separator } from '@/components/ui/separator';
import { ChartBarSquareIcon, ChatBubbleOvalLeftIcon, DocumentIcon, FlagIcon, Squares2X2Icon, TagIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { ReactNode } from 'react';

type LinkType = {
  links: { name: string; icon?: ReactNode; href: { name: string; href: string }[] | string }[];
  groupName: string;
  alt: string;
};

const links: LinkType[] = [
  {
    links: [{ name: 'Trang chủ', icon: <Squares2X2Icon className="w-6 h-6" />, href: '/admin/home' }],
    alt: 'home',
    groupName: '',
  },
  {
    links: [
      { name: 'Số Liệu', icon: <ChartBarSquareIcon className="w-6 h-6" />, href: '/admin/chart' },
      { name: 'Người Dùng', icon: <UserCircleIcon className="w-6 h-6" />, href: '/admin/users' },
      {
        name: 'Thể Loại',
        icon: <TagIcon className="h-6 w-6" />,
        href: [
          {
            name: 'Loại bài viết',
            href: '/admin/post-category',
          },
          {
            name: 'Loại kỹ năng',
            href: '/admin/skill-category',
          },
        ],
      },
    ],
    alt: 'home',
    groupName: 'Quản Lý',
  },
  {
    links: [
      { name: 'Báo cáo', icon: <FlagIcon className="h-6 w-6" />, href: '/admin/report' },
      { name: 'Bình luận', icon: <ChatBubbleOvalLeftIcon className="h-6 w-6" />, href: '/admin/comment' },
      { name: 'Bài đăng', icon: <DocumentIcon className="h-6 w-6" />, href: '/admin/post' },
    ],
    alt: 'home',
    groupName: 'Kiểm duyệt',
  },
];

export default async function Page({ children }: { children: ReactNode }) {
  const session = await getSession();

  return (
    <ProtectedRoute session={session} all={['ADMIN']}>
      <div className="flex divide-x h-full">
        <div className="text-nowrap min-w-64 h-full justify-between flex flex-col space-y-20 p-4">
          <div>
            <div className="p-4 text-5xl">ICON</div>
            {links.map(({ links, alt, groupName }, index) => (
              <div className="w-full flex justify-start gap-4 py-2 flex-col text-gray-500" key={index}>
                <div className="font-bold text-xl" title={alt}>
                  {groupName}
                </div>
                <div className="p-2 flex flex-col gap-2 font-bold text-lg">
                  {links.map(({ icon, name, href }) =>
                    typeof href === 'string' ? (
                      <NavLink key={href} icon={icon} href={href} name={name} />
                    ) : (
                      <div className="flex gap-4 p-2 items-start" key={name}>
                        {icon}
                        <Accordion type="single" collapsible className="max-w-full">
                          <AccordionItem value="item-1" className="border-none max-w-full overflow-hidden gap-4 grid">
                            <AccordionTrigger className="p-0 font-bold text-lg gap-2 hover:no-underline">{name}</AccordionTrigger>
                            {href.map((item) => (
                              <AccordionContent key={item.href}>
                                <Link href={item.href}>{item.name}</Link>
                              </AccordionContent>
                            ))}
                          </AccordionItem>
                        </Accordion>
                      </div>
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col  gap-2 pb-4">
            <Separator className="my-4"></Separator>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-2 p-2 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24" strokeWidth="1.5" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              </svg>
              Cài đặt
            </Button>
            <Button variant="ghost" className="w-full flex items-center justify-start gap-2 p-2 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" height="24" width="24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
              </svg>
              Đăng xuất
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full p-6 ">
          <Header />
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
}
