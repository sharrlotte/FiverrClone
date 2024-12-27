import { Package } from '@/api/post.api';
import { cn, translateDuration } from '@/lib/utils';
import { ClockIcon } from '@heroicons/react/24/outline';
import React from 'react';

type Props = {
  className?: string;
  data: Package;
};

export default function PackageCard({ className, data: { title, description, price, revision, deliveryTime, durationType } }: Props) {
  return (
    <div className={cn('border-2 rounded-md p-6 min-w-[400px] max-w-[500px] w-full bg-white', className)}>
      <div className="flex gap-2 justify-between items-end font-semibold pr-1">
        <span>{title}</span>
        <span>{price}VNĐ</span>
      </div>
      <div className="pt-4">{description}</div>
      <div className="flex gap-2 pt-2">
        <ClockIcon className="w-5 h-5" />
        Giao trong vòng {deliveryTime} {translateDuration(durationType)}
      </div>
      <span>Tối đa {revision} lần yêu cầu sửa chữa</span>
    </div>
  );
}
