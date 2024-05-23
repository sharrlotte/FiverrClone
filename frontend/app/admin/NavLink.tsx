import React from 'react';
import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  href: string;
  name: string;
  icon: ReactNode;
};

export default function NavLink({ href, name, icon }: Props) {
  return (
    <Link href={href} className="flex gap-4 items-center hover:bg-blue-400 hover:text-white p-2 rounded-md">
      {icon}
      <div>{name}</div>
    </Link>
  );
}
