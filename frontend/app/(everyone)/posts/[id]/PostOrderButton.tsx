'use client';

import { createPostOrder, Package, PostDetail } from '@/api/post.api';
import PackageCard from '@/components/post/PackageCard';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { PostOrderRequest } from '@/schema/post.schema';
import { AlertDialogDescription, AlertDialogTitle } from '@radix-ui/react-alert-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Props = {
  post: PostDetail;
  postPackage: Package;
};

export default function PostOrderButton({ post, postPackage }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: PostOrderRequest) => createPostOrder(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
      router.push('/my-order');
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 409:
          toast({
            title: 'Lỗi',
            description: 'Đơn hàng đã được đặt',
            variant: 'destructive',
          });
          break;

        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    },
    onSettled: () => {
      setOpen(false);
    },
  });

  async function handleSubmit() {
    await mutate({
      postId: post.id,
      packageId: postPackage.id,
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild disabled={isPending}>
        <Button className="w-full">Đặt</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Xác nhận đặt hàng</AlertDialogTitle>
        <AlertDialogDescription>
          <span>{`Xác nhận đặt đơn hàng tới ${post.user.username}`}</span>
          <div>Gói đã chọn</div>
          <PackageCard data={postPackage} />
        </AlertDialogDescription>
        <div className="grid grid-cols-2 gap-1">
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-500 hover:bg-blue-500" disabled={isPending} onClick={handleSubmit}>
            Xác nhận
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
