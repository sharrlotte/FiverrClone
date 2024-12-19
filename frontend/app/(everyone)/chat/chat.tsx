"use client"

import * as React from "react"
import {Send } from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


const users = [
  {
    name: "Olivia Martin",
    email: "m@example.com",
    avatar: "/avatars/01.png",
  },
] as const

type User = (typeof users)[number]

export function CardsChat() {
  const [open, setOpen] = React.useState(false)
  const [selectedUsers, setSelectedUsers] = React.useState<User[]>([])

  const [messages, setMessages] = React.useState([
    {
      role: "agent",
      content: "Chào mừng bạn đến với dịch vụ của tôi hãy để lại lời nhắn để tôi có thể hỗ trợ bạn",
    },
  ])
  const [input, setInput] = React.useState("")
  const inputLength = input.trim().length

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader className="flex flex-row items-center">
          <div className="flex items-center space-x-4 h-full">
            <Avatar>
              <AvatarImage src="/avatars/01.png" alt="Image" />
              <AvatarFallback>NV</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">Dat-Upoverloading</p>
              <p className="text-sm text-muted-foreground">Datupover@gmail.com</p>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
              </TooltipTrigger>
              <TooltipContent sideOffset={10}>New message</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardHeader>
        <CardContent className="flex flex-1 overflow-hidden h-full">
          <div className="space-y-4 overflow-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {message.content}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              if (inputLength === 0) return
              setMessages([
                ...messages,
                {
                  role: "user",
                  content: input,
                },
              ])
              setInput("")
            }}
            className="flex w-full items-center space-x-2"
          >
            <Input
              id="message"
              placeholder=""
              className="flex-1"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <Button type="submit" size="icon" disabled={inputLength === 0}>
              <Send />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  )
}