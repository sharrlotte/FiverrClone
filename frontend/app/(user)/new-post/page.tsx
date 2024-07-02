'use client';

import { createPost } from '@/api/post.api';
import AddPackageButton from '@/app/(user)/new-post/AddPackageButton';
import LoadingOverlay from '@/components/common/LoadingOverlay';
import PostCategoryNameById from '@/components/common/PostCategoryNameById';
import PostCategorySelector from '@/components/common/PostCategorySelector';
import PackageCard from '@/components/post/PackageCard';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { CreatePostRequest, createPostSchema } from '@/schema/post.schema';

const MarkdownEditor = dynamic(() => import('@/components/common/MarkdownEditor'));

export default function Page() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<CreatePostRequest>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: { text: '', images: [] },
      categories: [],
      packages: [],
      images: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: CreatePostRequest) => createPost(value),
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries(), 400);

      form.reset();
      toast({
        title: 'Thành công',
        description: 'Bài viết đã được tạo thành công',
      });
    },
    onError: (error: any) => {
      switch (error.response.status) {
        default:
          toast({
            title: 'Lỗi',
            description: 'Có lỗi đã xảy ra, vui lòng thử lại sau:' + error?.response?.data?.message,
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
    <div className="h-full overflow-hidden pt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-4 h-full overflow-y-auto p-4">
          <FormMessage />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên bài</FormLabel>
                <FormControl>
                  <Input placeholder="Tôi sẽ thiết kế cho bạn một trang web" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categories"
            render={({ field: { value, onChange } }) => (
              <FormItem className="flex flex-col pt-4">
                <FormLabel>Thể loại</FormLabel>
                <FormControl>
                  <PostCategorySelector isParent={false} multiple selected={value} onSelect={(provider) => onChange(provider(value))}>
                    {value && value.length > 0 && <PostCategoryNameById id={value[0]} />}
                  </PostCategorySelector>
                </FormControl>
                <FormMessage />
                <FormDescription>Các mục có liên quan đến bài, có thể chọn nhiều mục</FormDescription>
                <div className="gap-2 flex">
                  {value.map((item) => (
                    <span key={item} className="font-bold">
                      <PostCategoryNameById id={item} />
                    </span>
                  ))}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="packages"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel>Gói giá cả</FormLabel>
                <FormControl>
                  <AddPackageButton onSubmit={(value) => field.onChange([...field.value, value])} />
                </FormControl>
                <FormMessage />
                <div className="flex gap-2 flex-wrap">
                  {field.value.map((item) => (
                    <div key={item.title} className="relative">
                      <Button className="absolute top-0 right-0" variant="ghost" onClick={() => field.onChange(field.value.filter((i) => i.title !== item.title))}>
                        <XMarkIcon className="w-4 h-4" />
                      </Button>
                      <PackageCard data={item} />
                    </div>
                  ))}
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-4 gap-2">
                <FormLabel>Ảnh</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <label htmlFor="file" className="w-fit bg-blue-500 p-2 rounded-md text-white placeholder:text-white">
                      Chọn ảnh
                    </label>
                    <Input hidden className="hidden" id="file" type="file" multiple accept={'.png,.jpg,.jpeg'} onChange={(event) => field.onChange(event.currentTarget.files)} />
                    <div className="grid gap-2">
                      <span>Tệp đã chọn</span>
                      {new Array(field.value.length)
                        .fill(1)
                        .map((_, index) => (field.value as unknown as FileList).item(index) as File)
                        .map((file, index) => (
                          <span key={index}>{file.name}</span>
                        ))}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <MarkdownEditor value={field.value} onChange={(provider) => field.onChange(provider(field.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full flex justify-end py-4">
            <Button type="submit" disabled={isPending}>
              Đăng
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
