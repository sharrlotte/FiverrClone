import { getPost, visitPost } from '@/api/post.server-api';
import FavoriteButton from '@/components/post/FavoriteButton';
import PackageCard from '@/components/post/PackageCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Markdown from '@/components/ui/markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { calculateStar } from '@/lib/utils';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import { LucideShare2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const { title, starsCount, totalStars, user, images, content, packages, isFavorite } = await getPost(+id);
  visitPost(+id);

  return (
    <div className="h-full md:px-40 p-10 space-y-2 overflow-y-auto w-full overflow-x-hidden mt-10 relative">
      <div className="grid grid-cols-[1fr,500px] relative">
        <div className="space-y-4 overflow-x-hidden">
          <h1 className="text-wrap break-all">{title}</h1>
          <div className="flex gap-2 justify-between">
            <div>
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
            </div>
            <Carousel className="w-full max-h-[400px] bg-gray-200">
              <CarouselPrevious />
              <CarouselContent className="relative w-full h-full">
                {images.map((image) => (
                  <CarouselItem key={image} className="basis-full h-full w-full">
                    <Image className="w-full h-full flex" height={400} width={400} src={image} alt={title} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselNext />
            </Carousel>
          </div>
          <Markdown>{content}</Markdown>
        </div>
        <div className="flex flex-col px-4 gap-4">
          <div className="sticky top-4 space-y-2">
            <div className="flex justify-end items-end gap-1">
              <Button variant="outline">
                <LucideShare2 className="w-4 h-4"></LucideShare2>
              </Button>
              <FavoriteButton className="block border rounded-md p-1" postId={+id} isFavorite={isFavorite} />
            </div>
            <Tabs defaultValue={packages[0].title} className="min-w-[350px] space-y-2 shadow-md p-2 rounded-md bg-white border">
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
        </div>
      </div>
    </div>
  );
}
