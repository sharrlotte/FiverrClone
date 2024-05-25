import Link from 'next/link';
import React from 'react';

export default function Page() {
  return (
    <div className="p-4">
      <div className="flex justify-end w-full">
        <Link className="bg-blue-500 text-white border p-2 rounded-md" href="/new-post">
          Tạo bài mới
        </Link>
      </div>
    </div>
  );
}
