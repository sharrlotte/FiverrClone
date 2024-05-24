import React from 'react';
import Image from 'next/image';
import env from '@/constant/env';

type Post = {
  link: string;
  text: string;
  alt: string;
  image: string;
};

const images: Post[] = [
  {
    image: '/image/icons8-facebook.svg',
    alt: 'facebook',
    text: 'Continue with Facebook',
    link: `${env.url.backend_url}/auth/facebook`,
  },
  {
    image: '/image/icons8-google.svg',
    alt: 'google',
    text: 'Continue with Google',
    link: `${env.url.backend_url}/auth/google`,
  },
  {
    image: '/image/icons8-google.svg',
    alt: 'google',
    text: 'Continue with Github',
    link: `${env.url.backend_url}/auth/github`,
  },
];

export default function Page() {
  return (
    <main className="h-full w-full flex justify-center items-center">
      <div className="flex flex-row border h-3/5 w-3/5 shadow-2xl rounded-lg ">
        <div className="flex flex-col pl-20 gap-5 w-1/2 bg-rose-600 rounded-lg">
          <h1 className="text-nowrap font-black mt-10 text-white">Success starts here</h1>
          <ul className="text-white list-image-none">
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
        <div className="flex flex-col px-20 w-1/2 bg-white">
          <div className="flex flex-col gap-2 mt-10">
            <span className="font-black">Create a new account</span>
            <span className="text-xs">
              Already have an account?
              <a className="underline" href="">
                Sign in
              </a>
            </span>
            <div className="flex flex-col items-start gap-4 mt-6">
              {images.map(({ image, alt, text, link }) => (
                <a className="w-full rounded-md flex gap-2 border p-2 text-nowrap" href={link} key={link}>
                  <Image src={image} alt={alt} height={24} width={24} />
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
