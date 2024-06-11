import React from 'react';
import Image from 'next/image';
function Footer() {
  return (
    <div>
      <div className="mt-36 bg-blue-100/50 text-black">
        <div className="flex flex-row max-w-fdivl py-20">
          <div className="w-2/4 flex flex-col gap-4 size-design text-wrap px-32 ">
            <div>
              <h4 className="font-black">Giữ ngân sách của bạn</h4>
              <span>Tìm dịch vụ phù hợp với mọi mức giá. Không có giá theo giờ, chỉ có giá dựa trên dự án.</span>
            </div>

            <div>
              <h4 className="font-black">Hoàn thành công việc chất lượng nhanh chóng</h4>
              <span>Chuyển dự án của bạn cho một freelancer tài năng trong vài phút, nhận kết quả lâu dài.</span>
            </div>
            <div>
              <h4 className="font-black">Thanh toán khi bạn hài lòng</h4>
              <span>Báo giá trước không có bất ngờ. Thanh toán chỉ được phát hành khi bạn phê duyệt.</span>
            </div>
            <div>
              <h4 className="font-black">Hỗ trợ 24/7</h4>
              <span>Đội ngũ hỗ trợ suốt ngày đêm của chúng tôi sẵn sàng giúp đỡ bất cứ lúc nào, bất cứ đâu.</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white text-black py-20">
        <div>
          <span className="text-2xl px-32 font-black">Bạn cần gì, chúng tôi có đó</span>
        </div>
        <div className="grid grid-cols-5 px-12 relative mt-10">
          <div className="list-none transition ease-in-out delay-150 hover:scale-110 flex justify-center items-center">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="flex justify-center items-center">
                <Image src="/image/web-design.png" alt="Thiết kế đồ họa & Thiết kế" height={100} width={100} />
              </a>
              <span className="size-design">Thiết kế đồ họa & Thiết kế</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/performance.png" alt="Tiếp thị kỹ thuật số" height={100} width={100} />
              </a>
              <span className="size-design pl-14">Tiếp thị kỹ thuật số</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/contract.png" alt="Viết & Dịch thuật" height={100} width={100} />
              </a>
              <span className="size-design pl-14">Viết & Dịch thuật</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/video-editing.png" alt="Video & Hoạt hình" height={100} width={100} />
              </a>
              <span className="size-design pl-14">Video & Hoạt hình</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/microphone.png" alt="Âm nhạc & Âm thanh" height={100} width={100} />
              </a>
              <span className="size-design pl-20">Âm nhạc & Âm thanh</span>
            </li>
          </div>
        </div>
        <div className="grid grid-cols-5 px-12 relative mt-40">
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/web-programming.png" alt="Lập trình & Công nghệ" height={100} width={100} />
              </a>
              <span className="size-design pl-14">Lập trình & Công nghệ</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/handshake.png" alt="Kinh doanh" height={100} width={100} />
              </a>
              <span className="size-design pl-24">Kinh doanh</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/tea-cup.png" alt="Phong cách sống" height={100} width={100} />
              </a>
              <span className="size-design pl-24">Phong cách sống</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/folder.png" alt="Dữ liệu" height={100} width={100} />
              </a>
              <span className="size-design pl-24">Dữ liệu</span>
            </li>
          </div>
          <div className="list-none transition ease-in-out delay-150 hover:scale-110">
            <li className="flex flex-col icon absolute gap-2 text-nowrap">
              <a href="" className="pl-20">
                <Image src="/image/camera.png" alt="Nhiếp ảnh" height={100} width={100} />
              </a>
              <span className="size-design text-center">Nhiếp ảnh</span>
            </li>
          </div>
        </div>
      </div>

      <div className="mt-36">
        <div className="text-white flex flex-col pl-10 pt-4 bg-sky-700">
          <span className="font-black mt-4">Tạo logo tuyệt vời</span>
          <h3>trong vài phút</h3>
          <span>Thiết kế sẵn bởi các tài năng hàng đầu. Chỉ cần thêm chạm của bạn.</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
