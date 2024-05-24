import '@/app/globals.css';
import Header from './Header';
import Footer from './Footer';
import Carouselshow from '@/components/ui/carouselshow';
import Navigation from '@/app/Navigation';
export default function Home() {
  return (
    <main className="flex flex-col ">
      <div className="p-4">
        <Header />
        <Navigation />
      </div>
      <div className="bg-white max-h-96 mt-28">
        <div className="pl-10">
          <h1 className="text-4xl text-black">Popular Service</h1>
        </div>
        <div className="mt-5 px-20">
          <div className="font-black">
            <Carouselshow />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
