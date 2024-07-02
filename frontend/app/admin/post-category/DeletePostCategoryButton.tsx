import { deletePostCategory, PostCategory } from '@/api/post-category.api';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { TrashIcon } from '@radix-ui/react-icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Props = {
  postCategory: PostCategory;
};

export default function DeletePostCategoryButton({ postCategory: { id, name } }: Props) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async () => deletePostCategory(id),
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries(), 200);
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 400:
          toast({
            title: 'Lỗi',
            description: 'Xóa các thể loại con trước',
            variant: 'destructive',
          });
          break;

        case 404:
          toast({
            title: 'Lỗi',
            description: 'Không tìm thấy',
            variant: 'destructive',
          });
          break;

        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau' + error.response.data.message,
            variant: 'destructive',
          });
          break;
      }
    },
  });

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
