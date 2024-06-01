import { ReactNode } from 'react';
import { getSession } from '../../../../api/auth.api';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import { Button } from '../../../../components/ui/button';
import PopularServices from '../../../PopularServices';
import Evaluate from '../../../admin/users/Evaluate';
import RatingBreakdown from '../../../admin/users/RatingBreakdown';

export default async function page({ children }: { children: ReactNode }) {
    const user = await getSession();
    return (
        <div className="overflow-y-auto overflow-x-hidden h-full p-20">
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row gap-5'>
                    <div>
                        <div className="flex flex-row items-end gap-5">
                            <Avatar className='h-60 w-60'>
                                <AvatarImage className="rounded-full" src={user?.avatar + '.png'} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                    <div>
                        <div><span className='text-3xl'>{user?.username}</span></div>
                        <div>
                            <div>(icon sao) so sao (so luot dang gia)</div>
                            <div>(level user)</div>
                            <div>(quoc gia) (ngon ngu)</div>
                            <div>tag</div>
                        </div>
                    </div>
                </div>
                <div className='h-32 text-nowrap border-2 shadow-xl px-5 py-5'>
                    <div>
                        <div className="flex flex-row gap-4">
                            <div>
                                <Avatar className='h-20 w-20'>
                                    <AvatarImage className="rounded-full" src={user?.avatar + '.png'} alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <span className='text-lg'>{user?.username}</span>
                                <span>offine</span>
                                <span>9:32 am</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-24'>
                <div>
                    <div className='mt-20'>
                        <span>Skill-category</span>
                    </div>
                    <div className='mt-24 flex flex-col gap-2'>
                        <span className='font-black'>About me</span>
                        <span>Xin chào, tôi là Miyato, một nhà thiết kế đồ họa với nhiều năm kinh nghiệm làm việc với các thương hiệu hàng đầu như Coca-Cola, Converse, L’Oréal Paris, Sky TV, Xbox, cũng như một số nhà xuất bản sách uy tín trên toàn thế giới. Tôi quan tâm đến việc sử dụng các kỹ thuật truyền thống và tiên tiến, bao gồm cả AI, để biến tầm nhìn của khách hàng thành hiện thực. Các lĩnh vực chuyên môn của tôi bao gồm kỹ năng hình ảnh AI, minh họa, bìa sách, áp phích, tạp chí, chiến dịch quảng cáo, tài liệu tiếp thị, biên tập, chỉ đạo nghệ thuật và nhiều hơn nữa. Tôi mong được làm việc cùng bạn và tạo ra những điều tuyệt vời!</span>
                    </div>
                </div>
                <div className='mt-24'>
                    <span className='font-black'>bai dang</span>
                    <PopularServices />
                </div>
                <div className='mt-20'>
                    <span className='font-black'>carousel</span>
                    <PopularServices />
                </div>
                <div className='mt-10'>
                    <Button>
                        <span>xem them</span>
                    </Button>
                </div>
                <div className='mt-10'>
                    <span className='font-black'>Portfolio</span>
                    <PopularServices />
                </div>
                <div className='mt-20'>
                    <div className='flex flex-row gap-28'>
                        <Evaluate />
                        <RatingBreakdown />
                    </div>
                    <div>
                        <span>binh luan</span>
                    </div>
                </div>
            </div>
        </div >
    )
}
