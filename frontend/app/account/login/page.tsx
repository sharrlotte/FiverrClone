import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Post = {
  link: string;
  artist: string;
  alt: string;
};

const images: Post[] = [
  {
    link: "/image/icons8-facebook.svg",
    alt: "facebook",
    artist: "Continiue with facebook",
  },
  {
    link: "/image/icons8-google.svg",
    alt: "google",
    artist: "Continiue with google",
  },
];

export default function Page() {
  return (
    <main className="h-full w-full flex justify-center items-center">
      <div className="flex flex-row border h-3/5 w-3/5 shadow-2xl rounded-lg ">
        <div className="flex flex-col pl-20 gap-5 w-1/2 bg-rose-600 rounded-lg">
          <h1 className="text-nowrap font-black mt-10 text-white">
            Success starts here
          </h1>
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
              Already have an account?{" "}
              <a className="underline" href="">
                Sign in
              </a>
            </span>
          </div>
          <div className="flex flex-col gap-4 mt-5">
            {images.map(({ link, alt, artist }, index) => (
              <Button
                variant="outline"
                className="w-full rounded flex items-center justify-center gap-2"
                key={index}
              >
                <Image src={link} alt={alt} height={24} width={24} />
                {artist}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
