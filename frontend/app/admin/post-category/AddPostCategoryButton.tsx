'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { CreatePostCategoryRequest, createPostCategorySchema } from '@/schema/post-category.schema';
import { createPostCategory, getPostCategoryById } from '@/api/post-category.api';
import LoadingOverlay from '../../../components/common/LoadingOverlay';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import PostCategorySelector from '@/components/common/PostCategorySelector';

export default function AddPostCategoryButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreatePostCategoryRequest>({
    resolver: zodResolver(createPostCategorySchema),
    defaultValues: {
      name: '',
      description: '',
      parentId: undefined,
    },
  });

  const id = form.getValues('parentId') ?? 0;
  const { data } = useQuery({
    queryKey: ['post-category', id],
    queryFn: () => getPostCategoryById(id),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: CreatePostCategoryRequest) => createPostCategory(value),
    onSuccess: () => {
      queryClient.invalidateQueries();
      form.reset();
    },
    onError: (error: any) => {
      switch (error.response.status) {
        case 409:
          toast({
            title: 'Lỗi',
            description: 'Tên thể loại đã tồn tại, vui lòng chọn tên khác',
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

  return (
    <div>
      {isPending && <LoadingOverlay />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="items-center gap-2 h-10" variant="outline">
            <PlusCircleIcon className="w-6 h-6" />
            <span>Thêm</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="overflow-auto h-full">
          <Form {...form}>
            <h3 className="text-xl font-semibold">Thêm thể loại bài viết</h3>
            <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên thể loại</FormLabel>
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
                    <FormLabel>Mô tả thể loại</FormLabel>
                    <FormControl>
                      <Input placeholder="Mô tả" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parentId"
                render={({ field: { value, onChange } }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Thể loại cha</FormLabel>
                    <FormControl>
                      <PostCategorySelector selectedValues={value} onSelect={(value) => onChange(value)} isParent>
                        {data?.name}
                      </PostCategorySelector>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex justify-end">
                <Button type="submit">Lưu</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
