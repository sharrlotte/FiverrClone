import { getSession } from '@/api/auth.api';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';

export default async function page() {

  return (
    <div>
      <div className="p-4 g-2 w-full">
        <Card className="w-1/3 p-4 items-center flex-col">
          <div>
            <CardHeader className="flex-col items-center gap-2">
              <Avatar className="h-24 w-24">
                <AvatarImage className="rounded-full h-24 w-24" src={user.avatar + '.png'} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <CardTitle>Creat</CardTitle>
              <CardDescription>Deploy your new project in one-click.</CardDescription>
              <Button>Cập nhật</Button>
            </CardHeader>
          </div>
        </Card>
      </div>
    </div>
  );
}
