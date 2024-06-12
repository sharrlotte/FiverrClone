'use client';

import { favoritePost } from '@/api/post.api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  className?: string;
  postId: number;
  isFavorite: boolean;
};

export default function FavoriteButton({ className, postId, isFavorite }: Props) {
  const queryClient = useQueryClient();
  const [expected, setExpected] = useState(isFavorite);
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: () => favoritePost(postId),
    mutationKey: ['my-favorite-posts', postId],
    onMutate: () => {
      setExpected((prev) => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
    onError: () => {
      setExpected((prev) => !prev);
      toast({
        title: 'Lỗi',
        description: 'Vui lòng đăng nhập để thích',
      });
    },
  });

  return (
    <Button className={cn('w-9 h-9 p-2 drop-shadow-md', className)} variant="transparent" onClick={() => mutate()}>
      <HeartIcon fill={expected ? 'rgb(248 113 113)' : 'transparent'} className={cn('text-red-400', { 'text-red-400': expected })} />
    </Button>
  );
}
