import PopularServices from '@/app/PopularServices';
import NewServices from '@/app/NewServices';
import Header from '@/app/Header';
import Footer from '@/app/Footer';
export default function Home() {
  return (
    <main className="overflow-y-auto overflow-x-hidden h-full bg-gray-200">
      <div className="p-4 min-h-dvh">
        <Header />
        <div>
          <div className="space-y-8 py-8">
            <div>
              <h1 className="text-3xl text-black font-semibold">Mới</h1>
              <NewServices />
            </div>
            <div>
              <h1 className="text-3xl text-black font-semibold">Đề cử</h1>
              <PopularServices />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
