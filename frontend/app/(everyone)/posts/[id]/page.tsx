import { getPost, visitPost } from '@/api/post.server-api';
import PackageCard from '@/components/post/PackageCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
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
  const { title, starsCount, totalStars, user, images, content, packages } = await getPost(+id);
  visitPost(+id);

  return (
    <div className="h-full p-6 md:px-32 space-y-2 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-start w-full gap-20">
        <div className="space-y-4">
          <h1 className="text-wrap break-all">{title}</h1>
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
          <Carousel className="w-[400px] h-[400px]">
            <CarouselContent className="relative w-full h-full">
              {images.map((image) => (
                <CarouselItem key={image} className="basis-full">
                  <Image className="w-full h-full object-cover" height={400} width={400} src={image} alt={title} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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
