import { Button } from "@/components/ui/button"
import CompareTable from "../../compare/compare"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

export function CompareButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary">So Sánh</Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto h-auto justify-center items-center">
        <CompareTable/>
      </PopoverContent>
    </Popover>
  )
}
