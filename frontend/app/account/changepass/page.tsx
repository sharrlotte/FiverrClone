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

export default function Page() {
    return (
        <main className="h-full w-full flex justify-center items-center">
            <div className="flex lg:flex-row lg:h-3/5 w-full h-full flex-col lg:w-3/5 shadow-2xl rounded-lg overflow-hidden border">
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle className="text-7xl">Đổi mật khẩu</CardTitle>
                        <CardDescription>Deploy your new project in one-click.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Name of your project" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label className="mt-" htmlFor="framework">Framework</Label>
                                    <Input id="name" placeholder="Name of your project" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Deploy</Button>
                    </CardFooter>
                </Card>
            </div>
        </main>

    )
}
