import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CardsChat } from '../../chat/chat';

export function ChatButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Liên hệ</Button>
      </SheetTrigger>
      <SheetContent className="rounded-lg h-full sm:max-w-[min(100vw,600px)]">
        <CardsChat />
      </SheetContent>
    </Sheet>
  );
}
