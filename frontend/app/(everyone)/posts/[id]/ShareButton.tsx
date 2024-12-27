'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { LucideShare2 } from 'lucide-react';
import React from 'react';

type Props = {
  url: string;
};

export default function ShareButton({ url }: Props) {
  const toast = useToast();

  async function handleClick() {
    await navigator.clipboard.writeText(url);
    toast.toast({ description: 'Dã sao chép đường dẫn' });
  }

  return (
    <Button className="size-9 p-0" variant="outline" onClick={handleClick}>
      <LucideShare2 className="w-4 h-4"></LucideShare2>
    </Button>
  );
}
