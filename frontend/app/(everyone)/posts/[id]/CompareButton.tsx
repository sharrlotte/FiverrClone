import { Button } from '@/components/ui/button';
import CompareTable from '../../compare/compare';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Package } from '@/api/post.api';

type CompareButtonProps = {
  packages: Package[];
};
export function CompareButton({ packages }: CompareButtonProps) {
  const isComparable = packages.length > 1;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" disabled={!isComparable}>
          So Sánh
        </Button>
      </DialogTrigger>
      <DialogContent className="flex w-auto h-auto justify-center items-center max-w-[1000px]">
        <CompareTable packages={packages} />
      </DialogContent>
    </Dialog>
  );
}
