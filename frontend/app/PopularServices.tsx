'use client';

import React from 'react';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

type Post = {
  link: string;
  artist: string;
  title: string;
};

const images: Post[] = [
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'AI Artits', title: 'Add talent to AI' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'Logo Design', title: 'Build your brand' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'WordPress', title: 'Customize your site' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'Voice Over', title: 'share your messenge' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'video Explainer', title: 'Engage your audience' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'Socical Media', title: 'Read more customers' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'SEO', title: 'Unlock growth online' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'lllustration', title: 'Color your dream' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'Translation', title: 'Go Gobal' },
  { link: '/image/Screenshot 2024-03-30 184723.png', artist: 'Data Entry', title: 'Learn your business' },
];

export default function PopularServices() {
  return (
    <main>
      <Carousel className="w-full">
        <CarouselContent className="relative">
          {images.map(({ link, artist, title }, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/5 sm:basis-1/2 hover:opacity-80">
              <div className="absolute font-black px-2 gap-2 text-white flex flex-col ">
                <small className="tex-xs text-nowrap">{title}</small>
                <span className="text-nowrap">{artist}</span>
              </div>
              <Image className="overflow-hidden object-cover rounded-md" src={link} alt="slide show" height={100} width={300} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  );
}
