'use client';

import { favoritePost } from '@/api/post.api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from '@/context/SessionContext';
import { cn } from '@/lib/utils';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  className?: string;
  postId: number;
  isFavorite: boolean;
};

export default function FavoriteButton(props: Props) {
  const { session } = useSession();

  if (session) {
    return <FavoriteButtonInner {...props} />;
  }

  return <></>;
}
function FavoriteButtonInner({ className, postId, isFavorite }: Props) {
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
    <Button className={cn('size-12 p-2 drop-shadow-md backdrop-brightness-75', className)} variant="transparent" onClick={() => mutate()}>
      <HeartIcon fill={expected ? 'rgb(248 113 113)' : 'transparent'} className={cn('text-red-400', { 'text-red-400': expected })} strokeWidth={3} />
    </Button>
  );
}
