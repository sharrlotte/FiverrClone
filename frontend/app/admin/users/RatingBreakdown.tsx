'user client';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import React from 'react';

export default function Rating() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="font-black">Đánh giá cụ thể</span>
      </div>
      <div className="justify-between flex gap-10">
        <span className="opacity-50">Kỹ năng giao tiếp</span>
        <div className="flex flex-row gap-2">
          <span>5</span>
          <StarIcon className="h-6 w-6" fill="yellow" />
        </div>
      </div>
      <div className="flex justify-between gap-10">
        <span className="opacity-50">Mức độ thân thiện</span>
        <div className="flex flex-row gap-2">
          <span>4.9</span>
          <StarIcon className="h-6 w-6" fill="yellow" />
        </div>
      </div>
      <div className="flex justify-between gap-10">
        <span className="opacity-50">Chất lượng dịch vụ</span>
        <div className="flex flex-row gap-2">
          <span>5</span>
          <StarIcon className="h-6 w-6" fill="yellow" />
        </div>
      </div>
    </div>
  );
}
