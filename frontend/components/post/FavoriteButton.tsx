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
    mutationKey: ['my-favorite-posts', postId],
    onMutate: () => {
      setExpected((prev) => !prev);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
      });
    },
  });

  return (
    <Button className="w-8 h-8 p-0 absolute top-1 right-1" variant="transparent" onClick={() => mutate()}>
      <HeartIcon className={cn('text-white', { 'text-red-500': expected })} />
    </Button>
  );
}
