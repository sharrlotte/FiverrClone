'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UpdateSkillCategoryRequest, createSkillCategorySchema } from '@/schema/skill-category.schema';
import { SkillCategory, updaterSkillCategory } from '@/api/skill-category.api';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

type Props = { skillCategory: SkillCategory };

export default function UpdateSkillCategoryButton({ skillCategory: { id, name, description } }: Props) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<UpdateSkillCategoryRequest>({
    resolver: zodResolver(createSkillCategorySchema),
    defaultValues: {
      name: name,
      description: description,
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (value: UpdateSkillCategoryRequest) => updaterSkillCategory(id, value),
    onSettled: () => {
      setOpen(false);
    },
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries(), 200);
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
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex justify-start w-full items-center gap-2" variant="ghost">
          <PencilSquareIcon className="h-6 w-6" />
          <span>Cập nhật</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto h-fit">
        <Form {...form}>
          <h3 className="text-xl font-semibold">Cập nhật thể loại kỹ năng</h3>
          <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên</FormLabel>
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
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Input placeholder="Mô tả" {...field} />
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
  );
}
