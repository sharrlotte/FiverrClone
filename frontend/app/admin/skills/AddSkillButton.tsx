'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import LoadingOverlay from '../../../components/common/LoadingOverlay';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CreateSkillRequest, createSkillSchema } from '@/schema/skill.schema';
import { createSkill } from '@/api/skill.api';
import SkillCategorySelector from '@/app/admin/skills/SkillCategorySelector';
import SkillCategoryNameById from '@/components/common/SkillCategoryNameById';

export default function AddSkillButton() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateSkillRequest>({
    resolver: zodResolver(createSkillSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (value: CreateSkillRequest) => createSkill(value),
    onSuccess: () => {
      setTimeout(() => queryClient.invalidateQueries(), 400);

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
        <DialogContent className="overflow-auto h-fit">
          <Form {...form}>
            <h3 className="text-xl font-semibold">Thêm</h3>
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
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <FormLabel>Thể loại</FormLabel>
                    <FormControl>
                      <SkillCategorySelector selected={value} multiple={false} onSelect={(provider) => onChange(provider(value))}>
                        {value && <SkillCategoryNameById id={value} />}
                      </SkillCategorySelector>
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
