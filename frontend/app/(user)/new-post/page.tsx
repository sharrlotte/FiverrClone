'use client';

import { createPost } from '@/api/post.apit';
import PostCategorySelector from '@/components/common/PostCategorySelector';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage, Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { CreatePostRequest, createPostSchema } from '@/schema/post.schema';
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
      package: [],
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: CreatePostRequest) => createPost(value),
    onSuccess: () => {
      queryClient.invalidateQueries();
      form.reset();
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
    <div className="h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8 h-full overflow-y-auto p-4">
          <FormField
            control={form.control}
            name="title"
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
            name="content"
            render={({ field }) => (
              <FormItem className="h-full">
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  {/* TODO: Add images later */}
                  <MarkdownEditor value={{ text: field.value, images: [] }} onChange={({ text }) => field.onChange(text)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => (
              <FormItem className="flex flex-col pt-4">
                <FormLabel>Thể loại</FormLabel>
                <FormControl>
                  <PostCategorySelector isParent={false} multiple selectedValues={field.value} onSelect={(value) => field.onChange(value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="w-full flex justify-end py-4">
            <Button type="submit">Lưu</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
