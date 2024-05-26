import { Package } from '@/api/post.api';
import { translateDuration } from '@/lib/utils';
import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';

type Props = {
  data: Package;
};

export default function PackageCard({ data: { title, description, price, revision, deliveryTime, durationType } }: Props) {
  return (
    <div className="border rounded-md p-6 w-fit min-w-[200px]">
      <div className="flex gap-2 justify-between items-end font-semibold">
        <h3>{title}</h3>
        <p>{price}VNĐ</p>
      </div>
      <p className="pt-4">{description}</p>
      <span className="flex gap-2 pt-2">
        <ClockIcon className="w-5 h-5" />
        Giao trong vòng {deliveryTime} {translateDuration(durationType)}
      </span>
      <span>Tối đa {revision} lần yêu cầu sửa chữa</span>
    </div>
  );
}
