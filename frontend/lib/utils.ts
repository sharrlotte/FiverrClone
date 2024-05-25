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
