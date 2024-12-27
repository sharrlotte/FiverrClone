import { getPost, visitPost } from '@/api/post.server-api';
import PostOrderButton from '@/app/(everyone)/posts/[id]/PostOrderButton';
import FavoriteButton from '@/components/post/FavoriteButton';
import PackageCard from '@/components/post/PackageCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Markdown from '@/components/ui/markdown';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import React from 'react';
import { ChatButton } from './ChatButton';
import RatingList from '../../rating/RatingList';
import { getSession } from '@/api/auth-server.api';
import ShareButton from '@/app/(everyone)/posts/[id]/ShareButton';
import env from '@/constant/env';
import { PackageResponse, PostDetail } from '@/api/post.api';

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params: { id } }: Props) {
  const post = await getPost(id);
  const { title, user, images, content, packages, isFavorite } = post;

  const session = await getSession();

  if (session) {
    visitPost(id);
  }

  return (
    <div className="h-fit lg:px-[100px] space-y-2 overflow-y-auto w-full overflow-x-hidden mt-10 relative">
      <div className="grid grid-rows-2 lg:grid-cols-[1fr,500px] relative gap-4">
        <div className="space-y-4 overflow-x-hidden">
          <div className="flex gap-2 flex-col ">
            <Carousel className="w-full max-w-[900px] bg-gray-200 overflow-hidden rounded-2xl">
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
          <h1 className="text-wrap">{title}</h1>
          <div className="flex gap-2 items-end">
            <Avatar>
              <AvatarImage className="rounded-full h-10 w-10" src={user.avatar + '.png'} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span>{user.username}</span>
          </div>
          <Markdown>{content}</Markdown>
          <RatingList />
        </div>
        <div className="flex flex-col gap-4">
          <div className="sticky top-0 space-y-2">
            <PackageTab post={post} packages={packages} />
            <div className="flex justify-end items-end gap-1">
              <ShareButton url={`${env.url.base}/posts/${id}`} />
              <FavoriteButton className="block border rounded-md p-1 backdrop-brightness-100 size-9" postId={+id} isFavorite={isFavorite} />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

type PackageTabProps = {
  post: PostDetail;
  packages: PackageResponse[];
};

function PackageTab({ packages, post }: PackageTabProps) {
  return (
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
          <PackageCard className="max-w-none" data={item} />
          <div className="grid gap-2">
            <PostOrderButton post={post} postPackage={item} />
            <div className="grid grid-cols-2 gap-1">
              <ChatButton />
              <Button variant="secondary">So sánh</Button>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
