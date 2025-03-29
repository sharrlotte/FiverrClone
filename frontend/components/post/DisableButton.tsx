'use client';

import { disablePost, enablePost } from '@/api/post.api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from '@/context/SessionContext';
import { cn } from '@/lib/utils';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  className?: string;
  postId: number;
  isFavorite: boolean;
  isDeleted: boolean;
};

export default function DisableButton(props: Props) {
  const { session } = useSession();

  if (session) {
    return <DisableButtonInner {...props} />;
  }

  return <></>;
}
function DisableButtonInner({ className, postId, isDeleted }: Props) {
  const queryClient = useQueryClient();
  const [expected, setExpected] = useState(isDeleted);
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: () => (isDeleted ? enablePost(postId) : disablePost(postId)),
    mutationKey: ['my-favorite-posts-disable', postId],
    onMutate: () => {
      setExpected((prev) => !prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['posts'],
        exact: false,
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
      {expected ? <LockClosedIcon className="text-white" strokeWidth={3} /> : <LockOpenIcon className="text-white" strokeWidth={3} />}
    </Button>
  );
}
