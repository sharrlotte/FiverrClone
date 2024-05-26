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
import { CreatePostRequest, createPostSchema } from '@/schema/post.schema';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import React from 'react';
import { useForm } from 'react-hook-form';

const MarkdownEditor = dynamic(() => import('@/components/common/MarkdownEditor'));

export default function Page() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<CreatePostRequest>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      content: '',
      categories: [],
      packages: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: CreatePostRequest) => createPost(value),
    onSuccess: () => {
      queryClient.invalidateQueries();
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
    <div className="h-full overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8 h-full overflow-y-auto p-4">
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
            name="thumbnail"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-4">
                <FormLabel>Ảnh bìa</FormLabel>
                <FormControl>
                  <Input className="w-fit" type="file" accept={'.png,.jpg,.jpeg'} onChange={(event) => field.onChange(event.currentTarget.files && event.currentTarget.files[0])} />
                </FormControl>
                <FormMessage />
                <FormDescription>Ảnh được xuất hiện khi bài được hiện trên trang chủ</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="previews"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-4">
                <FormLabel>Ảnh</FormLabel>
                <FormControl>
                  <Input className="w-fit" type="file" multiple accept={'.png,.jpg,.jpeg'} onChange={(event) => field.onChange(event.currentTarget.files)} />
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
                  {/* TODO: Add images later */}
                  <MarkdownEditor value={{ text: field.value, images: [] }} onChange={(provider) => field.onChange(provider({ text: field.value, images: [] }).text)} />
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
