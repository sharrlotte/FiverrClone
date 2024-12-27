'use client';
import { updateProfile } from '@/api/user.api';
import { AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DialogTrigger, DialogContent, DialogHeader, DialogFooter, Dialog, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { UpdateProfileRequest, updateProfileSchema } from '@/schema/user.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  about: string;
};

export default function EditAboutDialog({ about }: Props) {
  const form = useForm<UpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      about,
    },
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: ({ about }: any) => updateProfile({ about }),
    onSuccess: () => {
      form.reset();

      setTimeout(() => queryClient.invalidateQueries(), 400);
      toast({
        description: 'Cập nhật thành công',
      });
    },
    onError: (error) => {
      toast({
        description: 'Cập nhật thất bại ' + error.message,
      });
    },
  });

  return (
    <AccordionItem value="item-1">
      <AccordionTrigger>Mô tả</AccordionTrigger>
      <AccordionContent className="space-y-4">
        <p>{about}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Cập nhật mô tả</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutate(data))} className="space-y-4 h-full overflow-y-auto p-4">
                <DialogHeader>
                  <DialogTitle>Chỉnh sửa Mô tả</DialogTitle>
                </DialogHeader>
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem className="grid gap-1">
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl className="grid grid-cols-4 items-baseline gap-4">
                        <Textarea id="name" defaultValue="" {...field} className="col-span-3 min-h-[200px]" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isPending}>
                    Lưu thay đổi
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </AccordionContent>
    </AccordionItem>
  );
}
