import { finishPostOrder, Order } from '@/api/order.api';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

type Props = {
  order: Order;
};

export default function FinishOrderButton({ order: { id } }: Props) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => finishPostOrder(id),
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
    onSettled: () => {
      setOpen(false);
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-full" variant="destructive" disabled={isPending}>
          Hoành thành
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Hoàn thành đơn</AlertDialogTitle>
        <p>Bạn có chắn chắn là muốn hoàn thành đơn này?</p>
        <div className="grid grid-cols-2 gap-1">
          <AlertDialogCancel>Hủy</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={() => mutate()}>
            Hoàn thành
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
