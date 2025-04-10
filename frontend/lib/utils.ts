import { OrderStatus } from '@/api/order.api';
import { DurationType, UserRole } from '@/constant/enum';
import { Session } from '@/schema/user.schema';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Filter =
  | {
      all: Filter[];
    }
  | {
      any: Filter[];
    }
  | boolean
  | { role: UserRole }
  | { authority: string }
  | { authorId: number }
  | undefined;

export function hasAccess(session: Session | undefined | null, filter: Filter): boolean {
  if (filter === undefined) {
    return true;
  }

  if (!session) {
    return false;
  }

  if (typeof filter === 'boolean') {
    return filter;
  }

  if ('all' in filter) {
    return filter.all.every((f) => hasAccess(session, f));
  }

  if ('any' in filter) {
    return filter.any.some((f) => hasAccess(session, f));
  }

  if ('role' in filter) {
    return session.roles?.map((r) => r).includes(filter.role);
  }

  if ('authority' in filter) {
    return session.authorities?.includes(filter.authority);
  }

  return session.id === filter.authorId;
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
  if (starsCount === 0 || totalStars === 0) {
    return '0.0';
  }

  return Math.round((starsCount / totalStars) * 10) / 10 + '';
}
