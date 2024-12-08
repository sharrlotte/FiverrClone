import { Order, resultAccept, resultReject } from '@/api/order.api';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

type FinishedOrderDialogProps = {
  order: Order;
};

export default function FinishedOrderDialog({ order: { id } }: FinishedOrderDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: accept, isPending: isAccepting } = useMutation({
    mutationFn: async () => resultAccept(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
    onError: (error: any) => {
      switch (error.response.status) {
        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    },
  });

  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: async () => resultReject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['orders'],
      });
    },
    onError: (error: any) => {
      switch (error.response.status) {
        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau',
            variant: 'destructive',
          });
          break;
      }
    },
  });

  return (
    <div className="flex gap-1">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isAccepting || isRejecting} variant="destructive">
            Từ chối
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Xác nhận từ chối sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>Bạn có chắc là muốn từ chối do phẩm không đạt yêu cầu, không đúng chất lượng hoặc do các lý do khác?</AlertDialogDescription>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={() => reject()} disabled={isRejecting || isAccepting}>
            Từ chối sản phẩm
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isAccepting || isRejecting}>Xác nhận</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogTitle>Xác nhận chấp nhận sản phẩm</AlertDialogTitle>
          <AlertDialogDescription>Bạn đồng ý với chất lượng của sản phẩm và muốn kết thúc đơn hàng?</AlertDialogDescription>
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction onClick={() => accept()} disabled={isAccepting || isRejecting}>
            Xác nhận sản phẩm
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
