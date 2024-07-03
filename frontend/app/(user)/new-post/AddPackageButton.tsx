'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { durationTypes } from '@/constant/enum';
import { translateDuration } from '@/lib/utils';
import { CreatePackageRequest, createPackageSchema } from '@/schema/post.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onSubmit: (value: CreatePackageRequest) => void;
};

export default function AddPackageButton({ onSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const form = useForm<CreatePackageRequest>({
    resolver: zodResolver(createPackageSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 100000,
      revision: 0,
      durationType: 'DAY',
      deliveryTime: 1,
    },
  });

  function handleSubmit(data: CreatePackageRequest) {
    setOpen(false);
    onSubmit(data);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">Thêm gói</Button>
      </DialogTrigger>
      <DialogContent onSubmit={(event) => event.stopPropagation()}>
        <DialogTitle>Thêm gói</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên gói</FormLabel>
                  <FormControl>
                    <Input placeholder="Gói thông thường" {...field} />
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
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Gói thông dụng" {...field} />
                  </FormControl>
                  <FormDescription>Các thông tin cơ bản về gói.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <FormLabel>Thời hạn giao</FormLabel>
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="deliveryTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Thời gian" type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="durationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select defaultValue={durationTypes[1]} value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Chọn đơn vị thời gian" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {durationTypes.map((item) => (
                                <SelectItem className="capitalize" key={item} value={item}>
                                  {translateDuration(item)}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormDescription>Thời hạn mà đơn hàng phải hoàn thành trong.</FormDescription>
            </div>
            <FormField
              control={form.control}
              name="revision"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lần sửa chữa</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Số lần khách hàng có thể yêu cần sửa chữa sản phần.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá</FormLabel>
                  <FormControl>
                    <div className="flex gap-1 items-end border rounded-md">
                      <Input className="border-none" placeholder="100000" {...field} /> <div className="text-center p-1">VNĐ</div>
                    </div>
                  </FormControl>
                  <FormDescription>Giá gói theo đơn vị Việt Nam Đồng.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end">
              <Button type="submit">Thêm</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
