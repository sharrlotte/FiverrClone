import Image from "next/image";
import "@/app/globals.css";
import Header from "./Header";
import Footer from "./Footer";
import Carouselshow from "@/components/ui/carouselshow";
export default function Home() {
  return (
    <main className="flex flex-col ">
      <Header />
      <div className="bg-white max-h-96 mt-28">
        <div className="pl-10">
          <h1 className="text-4xl text-black">Popular Service</h1>
        </div>
        <div className="mt-5 px-20">
          <div className="font-black hover:opacity-80">
            <Carouselshow />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
