import Image from 'next/image';
import '@/app/globals.css';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Nav from '@/components/ui/nav';
import Footericon from '@/components/ui/footericon';
import { title } from 'process';
import Carouselshow from '@/components/ui/carouselshow';

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

export default function Home() {
	return (
		<main className='flex flex-col'>
			<div className='bg-white'>
				<div className='container'>
					<Nav />
				</div>
				<div className='mt-52 w-full pl-10 text-indigo-50'>
					<span className='text-5xl text-black'>
						Find the right freelane <br />
						service, right away <br />
					</span>
					<input
						className='border-4 w-8/12 mt-3'
						type='search'
						placeholder='Search for any service...'
					/>

					<div className='text-sm flex flex-row gap-2 text-center mt-3 text-black'>
						<span className='p-2'>Popular :</span>
						<button className='p-2 border-2 border-solid rounded-full border-black hover:bg-slate-100 hover:text-black text-center'>Website Design</button>
						<button className='p-2 border-2 border-solid rounded-full border-black hover:bg-slate-100 hover:text-black text-center'>WordPress</button>
						<button className='p-2 border-2 border-solid rounded-full border-black  hover:bg-slate-100 hover:text-black text-center'>Logo Design</button>
						<button className='p-2 border-2 border-solid rounded-full border-black  hover:bg-slate-100 hover:text-black text-center'>AI service</button>
					</div>
				</div>
				<div className='mt-32 flex space-x-4 place-content-center gap-8 bg-gray-300 text-slate-700/50'>
					<span>TRUST BY</span>
					<span>META</span>
					<span>Google</span>
					<span>Netfix</span>
					<span>P&G</span>
					<span>PayPal</span>
				</div>
			</div>

			<div className='max-h-96 mt-28'>
				<div className='pl-10'>
					<h1 className='text-4xl text-black'>Popular Service</h1>
				</div>
				<div className=' mt-5 px-20'>
					<Carouselshow />
				</div>
				<div className='mt-36  bg-blue-100/50 text-black'>
					<div className='flex flex-row max-w-full py-20'>
						<div className='w-2/4 flex flex-col gap-4 text-wrap px-32'>
							<h1 className='font-black text-2xl'>The best part? Everything.</h1>
							<div>
								<h4 className='font-black'>Stick to your budget</h4>
								<span>Find the right service for every price point. No hourly rates, just project-based pricing.</span>
							</div>

							<div>
								<h4 className='font-black'>Get quality work done quickly</h4>
								<span>Hand your project over to a talented freelancer in minutes, get long-lasting results.</span>
							</div>
							<div>
								<h4 className='font-black'>Pay when you're happy</h4>
								<span>Upfront quotes mean no surprises. Payments only get released when you approve.</span>
							</div>
							<div>
								<h4 className='font-black'>Count on 24/7 support</h4>
								<span>Our round-the-clock support team is available to help anytime, anywhere.</span>
							</div>
						</div>
						<div className='w-2/4 flex justify-items-center px-32'>
							<video
								controls
								height='720px'
								width='480px'
								poster='image/Screenshot 2024-03-30 184723.png'
							>
								<source src='image/vmvv3czyk2ifedefkau7.mp4' />
							</video>
						</div>
					</div>
				</div>
				<div className='mt-36 bg-white text-black'>
					<div>
						<span className='text-2xl px-32 font-black'>You need it, we've got it</span>
					</div>
					<div>
						<Footericon />
					</div>
				</div>
				<div className='mt-36'>
					<div className='text-white flex flex-row pl-10 pt-4 bg-sky-700 justify-between'>
						<div className='flex flex-col justify-center'>
							<span className='text-xl'>
								<b>Fiverr</b>logomaker
							</span>
							<span className='font-black mt-10'>Make an incredible logo</span>
							<h3>in minutes</h3>
							<span>Pre-designed by top talent. Just add your touch.</span>
							<a
								className='pb-5'
								href=''
							>
								<button className='flex text-sky-500 max-w-56 bg-white px-2 mt-4'>Try Fiverr Logo Maker</button>
							</a>
						</div>
						<div>
							<Image
								src='/image/lohp-pro.webp'
								alt='anh'
								height={200}
								width={800}
							/>
						</div>
					</div>

				</div>
			</div>
		</main>
	);
}
