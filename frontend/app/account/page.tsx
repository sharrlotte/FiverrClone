import React from 'react';
import Image from 'next/image';
import '@/app/globals.css';

export default function Page() {
	return (
		<main className='text-black bg-[url("/image/login-background.jpg")] bg-center bg-cover h-full'>
			<div className='flex justify-center'>
				<div className='mt-32 login-from relative'>
					<h1 className='font-black mt-10 text-center'>Đăng Nhập</h1>
					<div className='text-white flex gap-10 flex-col mt-5'>
						<div className='rounded-full border-sky-950 justify-items-center bg-sky-400'>
							<Image
								className='inline-block'
								src='/image/facebook-icon.ico'
								alt='icon facebook'
								height={20}
								width={30}
							/>
							<a
								href=''
								className='text-lg'
							>
								tiếp tực với Facebook
							</a>
						</div>
						<div className='flex flex-row gap-4 border-[3px] border-none justify-items-center rounded-full bg-sky-400'>
							<Image
								src='/image/google-icon.ico'
								alt='icon google'
								height={20}
								width={30}
							/>
							<a
								href=''
								className='text-xl'
							>
								tiếp tực với Google
							</a>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
