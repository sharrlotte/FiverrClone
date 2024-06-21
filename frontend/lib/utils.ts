import { OrderStatus } from '@/api/post.api';
import { DurationType } from '@/constant/enum';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translateDuration(duration: DurationType) {
  switch (duration) {
    case 'Day':
      return 'Ngày';

    case 'Hour':
      return 'Giờ';

    case 'Month':
      return 'Tháng';

    case 'Week':
      return 'Tuần';

    case 'Year':
      return 'Năm';

    default:
  }
}
export function translateOrderStatus(status: OrderStatus) {
  switch (status) {
    case 'Pending':
      return 'Đang chờ';

    case 'Accepted':
      return 'Đã nhận';

    case 'Rejected':
      return 'Đã từ chối';

    case 'Cancelled':
      return 'Đã hủy';

    case 'Finished':
      return 'Đã hoàn thành';

    default:
  }
}

export function calculateStar(starsCount: number, totalStars: number): string {
  if (starsCount === 0) {
    return '0.0';
  }

  return Math.round((starsCount / totalStars) * 10) / 10 + '';
}
