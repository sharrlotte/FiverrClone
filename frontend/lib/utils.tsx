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

    case 'RESULT_ACCEPTED':
      return 'Đã kết thúc';

    case 'RESULT_REJECTED':
      return 'Sản phẩm bị từ tối';

    default:
  }
}

export function calculateStar(starsCount: number, totalStars: number): string {
  if (starsCount === 0 || totalStars === 0) {
    return '0.0';
  }

  return Math.round((starsCount / totalStars) * 10) / 10 + '';
}
