import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { link } from 'fs';
import { Key } from 'lucide-react';

type Post = {
	link: string;
	artist: string;
};

const images: Post[] = [
	{ link: '/image/facebook-icon.ico', artist: 'Continiue with facebook' },
	{ link: '/image/google-icon.ico', artist: 'Continiue with google' },
];

export default function Page() {
	return (
		<main className='h-full w-full flex justify-center items-center'>
			<div className='flex flex-row border h-3/5 w-3/5 shadow-2xl justify-between'>
				<div>
					ben phai
				</div>
				<div className='flex flex-col px-44 gap-5 justify-center'>
					<div className='flex flex-col'>
						<span className='font-black'>Create a new account</span>
						<small>Already have an account? <a className='underline' href="">Sign in</a></small>
					</div>
					<div className='flex flex-col gap-4'>
						{images.map(({ link, artist }, index) => (
							<div
								key={index}
								className='flex flex-row'
							>

								<Button variant='outline'>
									<div className='flex flex-row gap-4'>
										<Image
											src={link}
											alt='error 304'
											height={30}
											width={30}
										/>{artist}
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
