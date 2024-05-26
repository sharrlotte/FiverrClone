import { favoritePost } from '@/api/post.api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { HeartIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  postId: number;
  isFavorite: boolean;
};

export default function FavoriteButton({ postId, isFavorite }: Props) {
  const queryClient = useQueryClient();
  const [expected, setExpected] = useState(isFavorite);

  const { mutate } = useMutation({
    mutationFn: () => favoritePost(postId),
    mutationKey: ['favorite-post', postId],
    onMutate: () => {
      setExpected((prev) => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['my-favorite-posts'],
      });
      queryClient.invalidateQueries({
        queryKey: ['my-posts'],
      });
    },
  });

  return (
    <Button variant="ghost">
      <HeartIcon className={cn('w-7 h-7 absolute top-1 right-1 text-white', { 'text-red-500': expected })} onClick={() => mutate()} />
    </Button>
  );
}
