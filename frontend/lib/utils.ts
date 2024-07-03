import { OrderStatus } from '@/api/order.api';
import { DurationType } from '@/constant/enum';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function translateDuration(duration: DurationType) {
  switch (duration) {
    case 'DAY':
      return 'Ngày';

    case 'HOUR':
      return 'Giờ';

    case 'MONTH':
      return 'Tháng';

    case 'WEEK':
      return 'Tuần';

    case 'YEAR':
      return 'Năm';

    default:
  }
}
export function translateOrderStatus(status: OrderStatus) {
  switch (status) {
    case 'PENDING':
      return 'Đang chờ';

    case 'ACCEPTED':
      return 'Đã nhận';

    case 'REJECTED':
      return 'Đã từ chối';

    case 'CANCELLED':
      return 'Đã hủy';

    case 'FINISHED':
      return 'Đã hoàn thành';

    default:
  }
}

export function calculateStar(starsCount: number, totalStars: number): string {
  if (starsCount === 0 || totalStars === 0) {
    return '0.0';
  }

  return Math.round((starsCount / totalStars) * 10) / 10 + '';
}
