import React from 'react';
import Image from 'next/image';

export default function Nav() {
	return (
		<nav>
			<a
				href=''
				className='pl-10 px-5 py-5 text-center text-bla'
			>
				Fiverr
			</a>
			<ul className='main-menu'>
				<li>
					<a href=''>Fiverr Pro</a>
					<ul className='sub-menu bg-slate-100'>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='grid grid-cols-4'>
									<div>
										<Image
											src='/image/COC-COC.ico'
											alt='menu-1'
											width={100}
											height={24}
										/>
									</div>
									<div className='col-span-3 text-base/4 font-design text-black'>
										<h2 className=' font-bold font-sans'>I'm looking to hire</h2>
										<span className='font-sans'>I'd like to work with Pro freelancers and agencies while using free business tools. </span>
									</div>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='grid grid-cols-4'>
									<div>
										<Image
											src='/image/icon.ico'
											alt='menu-2'
											width={100}
											height={24}
										/>
									</div>
									<div className='col-span-3 font-design text-black'>
										<h2 className=' font-bold font-sans'>I want to offer Pro sevices</h2>
										<span>I'd like to work on business projects as a Pro freelancer or agency.</span>
									</div>
								</div>
							</a>
						</li>
					</ul>
				</li>
				<li>
					<a href=''>Explore</a>
					<ul className='sub-menu bg-slate-100'>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='text-black font-design'>
									<h2 className='font-bold font-sans'>Discover</h2>
									<span>inspring projects made on Fiverr</span>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='text-black font-design'>
									<h2 className='font-bold font-sans'>Community</h2>
									<span>Conect with Fiverr's team and commynity</span>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='font-design text-black'>
									<h2 className='font-bold font-sans'>Guides</h2>
									<span>In-deth guides covering business topics</span>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='font-design text-black'>
									<h2 className='font-bold font-sans'>Podcast</h2>
									<span>Inside tips from top business minds</span>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='font-design text-black'>
									<h2 className='font-bold font-sans'>Learn</h2>
									<span>Professional online courses, led by experts</span>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='font-design text-black'>
									<h2 className='font-bold font-sans'>Blog</h2>
									<span>News, information and community stories</span>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='font-design text-black'>
									<h2 className='font-bold font-sans'>Logo Maker</h2>
									<span>Create your logo instantly</span>
								</div>
							</a>
						</li>
						<li className='hover:bg-gray-200/50'>
							<a href=''>
								<div className='font-design text-black'>
									<h2 className='font-bold font-sans'>Fiverr Workspace</h2>
									<span>one place to manage your business</span>
								</div>
							</a>
						</li>
					</ul>
				</li>
				<li>
					<a href=''>English</a>
				</li>
				<li>
					<a href=''>Become a Seller</a>
				</li>
				<li>
					<a
						href=''
						className='hover:bg-green-400/50 border-solid rounded-full'
					>
						Sign in
					</a>
				</li>
				<li>
					<a
						href=''
						className='hover:bg-green-400/50 border-solid rounded-full'
					>
						Log Out
					</a>
				</li>
			</ul>
		</nav>
	);
}
