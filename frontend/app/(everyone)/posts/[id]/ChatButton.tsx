import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CardsChat } from '../../chat/chat';
import { UserProfile } from '@/schema/user.schema';

type Props = {
  user: Pick<UserProfile, 'username' | 'avatar' | 'id' | 'welcomeMessage'>;
};

export function ChatButton({ user }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Liên hệ</Button>
      </SheetTrigger>
      <SheetContent className="rounded-lg h-full sm:max-w-[min(100vw,600px)]">
        <CardsChat user={user} />
      </SheetContent>
    </Sheet>
  );
}
