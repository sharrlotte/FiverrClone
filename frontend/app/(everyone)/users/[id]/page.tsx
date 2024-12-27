import { getUser } from '@/api/user.api';
import { Avatar, AvatarFallback, AvatarImage } from '../../../../components/ui/avatar';
import PopularServices from '../../../PopularServices';
import Evaluate from '../../../admin/users/Evaluate';
import RatingBreakdown from '../../../admin/users/RatingBreakdown';
import { ChatButton } from '@/app/(everyone)/posts/[id]/ChatButton';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let idInt = -1;
  try {
    idInt = parseInt(id);
  } catch {
    //ignore
  }
  if (idInt === -1) {
    return <div>Lỗi mã người dùng không hợp lệ</div>;
  }

  const { avatar, about, skills, username, welcomeMessage } = await getUser(idInt);

  return (
    <div className="overflow-y-auto overflow-x-hidden space-y-4 h-full p-20">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-5">
          <div>
            <div className="flex flex-row items-end gap-5">
              <Avatar className="h-60 w-60">
                <AvatarImage className="rounded-full" src={avatar + '.png'} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1>{username}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24 flex flex-col justify-start items-start">
        <ChatButton user={{ username, id: idInt, avatar, welcomeMessage }} />
      </div>
      <div className="mt-24 flex flex-col">
        {skills && skills.length > 0 && (
          <div className="mt-20">
            <span>Kỹ năng</span>
            <div className="flex gap-2 flex-wrap">
              {skills.map((skill) => (
                <span key={skill.id}>{skill.name}</span>
              ))}
            </div>
          </div>
        )}
        {about && (
          <div className="mt-24 flex flex-col gap-2">
            <span className="font-black">Giới thiệu</span>
            <span>{about}</span>
          </div>
        )}
        <div className="mt-10 space-y-2">
          <span className="font-black">Dịch vụ nổi bật</span>
          <PopularServices userId={idInt} />
        </div>
        <div className="mt-20">
          <div className="flex flex-row gap-28">
            <Evaluate />
            <RatingBreakdown />
          </div>
          <div className="mt-10">
            <span>Bình luận</span>
          </div>
        </div>
      </div>
    </div>
  );
}
