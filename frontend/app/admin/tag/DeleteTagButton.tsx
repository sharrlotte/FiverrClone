'use client';

import { deleteTag, Tag } from '@/api/tag.api';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
    tag: Tag;
};

export default function DeleteTagButton({ tag: { id, name } }: Props) {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const { mutate, isPending } = useMutation({
        mutationFn: async () => deleteTag(id),
        onSuccess: () => {
            queryClient.invalidateQueries();
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

    if (isPending) {
        return <LoadingOverlay />;
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button className="flex justify-start w-full items-center gap-2" variant="ghost">
                    <TrashIcon className="w-6 h-6" />
                    Xóa
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Bạn có chắn chắn muốn xóa {name} ?</AlertDialogTitle>
                    <AlertDialogDescription>Một khi đã xóa thì không thể hoàn tác.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Hủy</AlertDialogCancel>
                    <AlertDialogAction onClick={() => mutate()}>Xóa</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
