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
	{ link: '/image/COC-COC.ico', artist: 'AI Artits', title: 'Add talent to AI' },
	{ link: '/image/COC-COC.ico', artist: 'Logo Design', title: 'Build your brand' },
	{ link: '/image/COC-COC.ico', artist: 'WordPress', title: 'Customize your site' },
	{ link: '/image/COC-COC.ico', artist: 'Voice Over', title: 'share your messenge' },
	{ link: '/image/COC-COC.ico', artist: 'video Explainer', title: 'Engage your audience' },
	{ link: '/image/COC-COC.ico', artist: 'Socical Media', title: 'Read more customers' },
	{ link: '/image/COC-COC.ico', artist: 'SEO', title: 'Unlock growth online' },
	{ link: '/image/COC-COC.ico', artist: 'lllustration', title: 'Color your dream' },
	{ link: '/image/COC-COC.ico', artist: 'Translation', title: 'Go Gobal' },
	{ link: '/image/COC-COC.ico', artist: 'Data Entry', title: 'Learn your business' },
];

export default function Carouselshow() {
	return (
		<main>
			<Carousel className='w-full'>
				<CarouselContent className='relative'>
					{images.map(({ link, artist, title }, index) => (
						<CarouselItem
							key={index}
							className='md:basis-1/3 lg:basis-1/5 sm:basis-1/2'
						>
							<div className='absolute font-black px-2 gap-2 text-white flex flex-col'>
								<small className='tex-xs text-nowrap'>{title}</small>
								<span className='text-nowrap'>{artist}</span>
							</div>

							<Image
								src={link}
								alt='slide show'
								height={100}
								width={300}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</main>
	);
}
