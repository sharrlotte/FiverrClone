import { getPost, visitPost } from '@/api/post.server-api';
import PackageCard from '@/components/post/PackageCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Markdown from '@/components/ui/markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateStar } from '@/lib/utils';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import Image from 'next/image';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const { title, starsCount, totalStars, user, thumbnail, content, packages } = await getPost(+id);
  visitPost(+id);

  return (
    <div className="h-full p-6 md:px-40 space-y-2 overflow-y-auto">
      <div className="flex justify-start w-full gap-20 flex-wrap">
        <div className="space-y-4">
          <h1>{title}</h1>
          <div className="flex gap-2 items-end">
            <Avatar>
              <AvatarImage className="rounded-full h-10 w-10" src={user.avatar + '.png'} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{user.username}</span>
          </div>
          <div className="flex text-lg gap-1">
            <StarIcon className="w-6 h-6" />
            <span className="font-bold">{calculateStar(starsCount, totalStars)}</span>
            <span>({starsCount})</span>
          </div>
          <Image height={400} width={400} src={thumbnail} alt={title} />
        </div>
        <Tabs defaultValue={packages[0].title} className="w-[350px] space-y-2">
          <TabsList className="flex gap-2">
            {packages.map((item) => (
              <TabsTrigger className="flex-1" key={item.title} value={item.title}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {packages.map((item) => (
            <TabsContent key={item.title} value={item.title}>
              <PackageCard data={item} />
            </TabsContent>
          ))}
          <div className="grid gap-2">
            <Button>Đặt</Button>
            <Button variant="secondary">Liên hệ</Button>
          </div>
        </Tabs>
      </div>
      <div className="space-x-2 flex"></div>
      <Markdown>{content}</Markdown>
    </div>
  );
}
