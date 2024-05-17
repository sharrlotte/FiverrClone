import Image from "next/image";
import "@/app/globals.css";
import Header from "./Header";
import Footer from "./Footer";
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
            <h2 className="text-shadow px-2">so 1</h2>
            <h1 className="text-shadow px-2">AI artists</h1>
            <Image
              src="/image/COC-COC.ico"
              alt="slide show"
              height={100}
              width={100}
            />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
