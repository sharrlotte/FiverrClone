'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function InvalidCategoryPage() {
  const { back } = useRouter();

  return (
    <div className="flex h-full w-full justify-center items-center flex-col gap-2">
      <h3>Mã thể loại không hợp lệ</h3>
      <Button onClick={back}>Quay lại</Button>
    </div>
  );
}
