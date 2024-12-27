'use client';

import { getSkills, SkillCategory } from '@/api/skill-category.api';
import { updateSkills } from '@/api/user.api';
import { revalidateServer } from '@/api/user.server-api';
import { AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { DialogTrigger, DialogContent, DialogHeader, DialogFooter, Dialog, DialogTitle } from '@/components/ui/dialog';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useState } from 'react';

type UpdateSkillDialogProps = {
  skills: SkillCategory[];
};

const debounced = debounce(async (skills: number[], callback: () => void) => {
  await updateSkills(skills);
  callback();
}, 1000);

export function UpdateSkillDialog({ skills }: UpdateSkillDialogProps) {
  const [filter, setFilter] = useState<SkillCategory[]>(skills);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate } = useMutation({
    mutationFn: async (data: number[]) =>
      debounced(data, () => {
        queryClient.invalidateQueries({
          queryKey: ['users'],
          exact: false,
        });

        revalidateServer('/profile');
      }),
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

  const { data, isPending } = useQuery({
    queryKey: ['skills'],
    queryFn: () => getSkills({ size: 40, page: 1 }),
  });

  function handleUpdateRole(data: SkillCategory[]) {
    mutate(data.map((skill) => skill.id));
    setFilter(data);
  }

  const selections = isPending ? [] : data ?? [];

  return (
    <AccordionItem value="item-3">
      <AccordionTrigger>Kỹ năng</AccordionTrigger>
      <AccordionContent>
        <div className="flex flex-wrap gap-1 ">
          {skills.map((skill) => (
            <TooltipProvider key={skill.id}>
              <Tooltip>
                <TooltipTrigger className="underline">{skill.name}</TooltipTrigger>
                <TooltipContent>{skill.description}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Cập nhật</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Thêm kỹ năng</DialogTitle>
            </DialogHeader>
            <ToggleGroup className="justify-start flex flex-wrap rounded-md divide-x gap-1 w-fit" type="multiple" value={filter.map((s) => s.id + '')} onValueChange={(values) => handleUpdateRole(data?.filter((v) => values.includes(v.id + '')) ?? [])}>
              {selections.map((skill) => (
                <ToggleGroupItem className="data-[state=on]:bg-blue-500 border rounded-none overflow-visible data-[state=on]:text-white" key={skill.id} value={skill.id + ''}>
                  {skill.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <DialogFooter>
              <Button type="submit">Lưu thay đổi</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AccordionContent>
    </AccordionItem>
  );
}
