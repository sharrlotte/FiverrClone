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
    text: 'Tiếp tục với Facebook',
    link: `${env.url.backend_url}/auth/facebook`,
  },
  {
    image: '/image/icons8-google.svg',
    alt: 'google',
    text: 'Tiếp tục với Google',
    link: `${env.url.backend_url}/auth/google`,
  },
  {
    image: '/image/github-mark.svg',
    alt: 'google',
    text: 'Tiếp tục với Github',
    link: `${env.url.backend_url}/auth/github`,
  },
];

export default function Page() {
  return (
    <main className="h-full w-full flex justify-center items-center">
      <div className="flex lg:flex-row border lg:h-3/5 w-full h-full flex-col lg:w-3/5 shadow-2xl rounded-lg ">
        <div className="hidden lg:flex flex-col px-10 gap-5 bg-rose-600 flex-1 rounded-lg">
          <h1 className="text-nowrap font-black mt-10 text-white">Bắt đầu ngay bây giờ</h1>
          <ul className="text-white">
            <li className="list-item">
              <span>Hơn 600 danh mục</span>
            </li>
            <li className="list-item">
              <span>Trả tiền theo dự án, không phải theo giờ</span>
            </li>
            <li className="list-item">
              <span>Tiếp cận với tài năng và doanh nghiệp ở mọi nơi</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col px-10 bg-white flex-1 lg:justify-start justify-center">
          <div className="flex flex-col gap-2 justify-center items-center mt-10">
            <span className="font-black text-3xl text-center">Đăng nhập</span>
            <div className="flex flex-col items-center gap-4 mt-6 min-w-fit w-1/2">
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
