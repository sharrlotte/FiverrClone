import { getPost } from '@/api/post.server-api';
import PostOrderButton from '@/app/(everyone)/posts/[id]/PostOrderButton';
import Visit from '@/app/(everyone)/posts/[id]/Visist';
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
  const post = await getPost(id);
  const { title, starsCount, totalStars, user, images, content, packages, isFavorite } = post;

  return (
    <div className="h-full md:px-[200px] space-y-2 overflow-y-auto w-full overflow-x-hidden mt-10 relative">
      <Visit id={id} />
      <div className="grid grid-cols-[1fr,500px] relative">
        <div className="space-y-4 overflow-x-hidden">
          <h1 className="text-wrap">{title}</h1>
          <div className="flex gap-2 flex-col ">
            <div className="w-full h-full">
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
            <Carousel className="w-full max-h-[400px] bg-gray-200 overflow-hidden rounded-2xl">
              <CarouselPrevious />
              <CarouselContent className="relative w-full h-full">
                {images.map((image) => (
                  <CarouselItem key={image} className="basis-full h-full w-full">
                    <Image className="w-full h-full flex min-w-[400px] object-cover" height={400} width={400} src={image} alt={title} />
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
                <TabsContent className="space-y-2" key={item.title} value={item.title}>
                  <PackageCard data={item} />
                  <div className="grid gap-2">
                    <PostOrderButton post={post} postPackage={item} />
                    <div className="grid grid-cols-2 gap-1">
                      <Button variant="secondary">Liên hệ</Button>
                      <Button variant="secondary">So sánh</Button>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
