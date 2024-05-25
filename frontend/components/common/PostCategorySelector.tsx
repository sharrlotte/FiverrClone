import { getPostCategory } from '@/api/post-category.api';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import React, { ReactNode, useState } from 'react';

type BaseProps = {
  isParent?: boolean;
  children?: ReactNode;
};

type Props =
  | (BaseProps & {
      multiple?: false;
      selected?: number;
      onSelect: (provider: (selected: number | undefined) => number | undefined) => void;
    })
  | (BaseProps & {
      multiple: true;
      selected?: number[];
      onSelect: (provider: (selected: number[]) => number[]) => void;
    });

export default function PostCategorySelector({ selected, isParent, multiple, onSelect, children }: Props) {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  const { data, isFetching } = useQuery({
    queryKey: ['post-categories', isParent, name],
    queryFn: () =>
      getPostCategory({
        name,
        page: 1,
        size: 20,
        isParent,
      }),
  });

  function handleSelect(id: number) {
    if (multiple) {
      onSelect((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]));
    } else {
      if (selected && selected === id) {
        onSelect(() => undefined);
      } else {
        onSelect(() => id);
      }
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="items-center gap-2 h-10 w-fit bg-accent" variant="outline">
          Chọn thể loại
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Chọn thể loại</DialogTitle>
        <Input value={name} onChange={(event) => setName(event.target.value)}></Input>
        {isFetching ? (
          'Đang tải'
        ) : (
          <div>
            {data && data.length > 0 ? (
              <div className="flex flex-row flex-wrap gap-2">
                {data.map(({ name, id }) => (
                  <Button
                    key={id}
                    onClick={() => handleSelect(id)}
                    className={cn({
                      'bg-emerald-500 hover:bg-emerald-500': selected && multiple ? selected.includes(id) : selected === id,
                    })}
                  >
                    {name}
                  </Button>
                ))}
              </div>
            ) : (
              <div>Không có kết quả</div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
