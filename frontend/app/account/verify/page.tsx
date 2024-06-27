'use client';
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp"

export default function Page() {
  return (
    <main className="h-full w-full flex justify-center items-center">
        <div className="flex lg:flex-row lg:h-3/5 w-full h-full flex-col lg:w-3/5 shadow-2xl rounded-lg overflow-hidden">
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Xác thực tài khoản của bạn </CardTitle>
        <CardDescription>Vui lòng xác thực địa chỉ Email của bạn và nhập mã xác minh mà chúng tôi đã gửi cho bạn </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Vui lòng nhập" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="mt-10" htmlFor="framework">Mã xác nhận </Label>
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
                </InputOTP>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="mt-20" variant="outline">Cancel</Button>
        <Button className="mt-20"> Mã xác nhận </Button>
      </CardFooter>
    </Card>
    </div>
    </main>
  )
}
