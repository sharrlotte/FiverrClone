import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CardsChat } from "../../chat/chat"

export function ChatButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Liên hệ</Button>
      </SheetTrigger>
      <SheetContent className="rounded-lg h-full w-full">
        <CardsChat/>
      </SheetContent>
    </Sheet>
  )
}
