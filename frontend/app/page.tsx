import '@/app/globals.css';
import Header from './Header';
import Footer from './Footer';
import PopularServices from '@/app/PopularServices';
import NewServices from '@/app/NewServices';
export default function Home() {
  return (
    <main className="overflow-y-auto overflow-x-hidden h-full">
      <div className="p-4 min-h-dvh">
        <Header />
        <div className="bg-white">
          <div className="space-y-8 p-12">
            <div>
              <h1 className="text-3xl text-black">Mới</h1>
              <NewServices />
            </div>
            <div>
              <h1 className="text-3xl text-black">Đề cử</h1>
              <PopularServices />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
