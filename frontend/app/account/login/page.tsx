import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { link } from 'fs';
import { Key } from 'lucide-react';

type Post = {
	link: string;
	artist: string;
	alt: string;
};

const images: Post[] = [
	{ link: '/image/facebook-icon.ico', alt: 'facebook', artist: 'Continiue with facebook' },
	{ link: '/image/google-icon.ico', alt: 'google', artist: 'Continiue with google' },
];

export default function Page() {
	return (
		<main className='h-full w-full flex justify-center items-center'>
			<div className='flex flex-row border h-3/5 w-3/5 shadow-2xl rounded-lg '>
				<div className='flex flex-col pl-20 gap-5 w-1/2 bg-rose-600'>
					<h1 className='text-nowrap font-black mt-10 text-white'>Success starts here</h1>
					<ul className='text-white list-image-none'>
						<li>
							<span>Over 600 categories</span>
						</li>
						<li>
							<span>Pay per project, not per hour</span>
						</li>
						<li>
							<span>Access to talent and businesses across the globe</span>
						</li>
					</ul>
				</div>
				<div className='flex flex-col px-20 w-1/2 bg-white'>
					<div className='flex flex-col gap-2 mt-10'>
						<span className='font-black'>Create a new account</span>
						<span className='text-xs'>Already have an account? <a className='underline' href="">Sign in</a></span>
					</div>
					<div className='flex flex-col gap-4 mt-5'>
						{images.map(({ link, alt, artist }, index) => (
							<div
								key={index}
							>

								<Button variant='outline'
									className='w-full rounded'>
									<div className='flex flex-row gap-2'>
										<Image
											src={link}
											alt={alt}
											height={20}
											width={20}
										/>
										{artist}
									</div>
								</Button>
							</div>
						))}
					</div>
				</div>
			</div>

		</main>
	);
}
