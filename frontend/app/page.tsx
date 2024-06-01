import '@/app/globals.css';
import Header from './Header';
import Footer from './Footer';
import PopularServices from '@/app/PopularServices';
import Navigation from '@/app/Navigation';
import Link from 'next/link';
import NewServices from '@/app/NewServices';
export default function Home() {
  return (
    <main className="overflow-y-auto overflow-x-hidden h-full ">
      <div className="p-4 min-h-dvh">
        <div className="flex gap-2 w-full">
          <Link className="text-3xl font-bold" href="/">
            ICON
          </Link>
          <Header />
        </div>
        <Navigation />
        <div className="bg-white">
          <div className="space-y-10 p-20">
            <div>
              <h1 className="text-4xl text-black">Mới</h1>
              <NewServices />
            </div>
            <div>
              <h1 className="text-4xl text-black">Đề cử</h1>
              <PopularServices />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
