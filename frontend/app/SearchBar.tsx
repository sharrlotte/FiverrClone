'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function SearchBar() {
  const router = useRouter();

  return (
    <div className="flex w-full items-center gap-2">
      <div className="absolute w-full flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        aria-required="false"
        onChange={(event) => {
          router.push(`/posts?q=${event.currentTarget.value}`);
        }}
        name="q"
        className="block w-full h-9 text-xs p-2 ps-10 rounded-full text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Bạn đang tìm kiếm những gì ?"
        required
      />
    </div>
  );
}
