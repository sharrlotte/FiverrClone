import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CreateSkillCategoryRequest, createSkillCategorySchema } from '@/schema/skill-category.schema';
import { createSkillCategory } from '@/api/skill-category.api';
import LoadingOverlay from './LoadingOverlay';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddSkillCategoryButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateSkillCategoryRequest>({
    resolver: zodResolver(createSkillCategorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: CreateSkillCategoryRequest) => createSkillCategory(value),
    onMutate: () => {
      setOpen(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
    },

    onError: (error: any) => {
      toast({
        title: 'Lỗi',
        description: 'Có lỗi đã xảy ra, vui lòng thử lại sau: ' + error.response.data.message,
      });
    },
  });

  return (
    <div>
      {isPending && <LoadingOverlay />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex justify-between w-full items-center" variant="outline">
            <Image src="/image/add.svg" height={24} width={24} alt="" />
            <span>Thêm món</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-auto h-full">
          <FormProvider {...form}>
            <h3 className="text-xl font-semibold">Thêm Thể Loại</h3>
            <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả sản phẩm</FormLabel>
                    <FormControl>
                      <Input placeholder="Mô tả" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Lưu</Button>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
}
