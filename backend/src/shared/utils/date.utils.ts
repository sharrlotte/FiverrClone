import { DurationType } from '@prisma/client';

export function getDeliveryDate(durationType: DurationType, duration: number): Date {
  const now = new Date();

  switch (durationType) {
    case 'Day':
      now.setDate(now.getDate() + duration);
      break;

    case 'Hour':
      now.setHours(now.getHours() + duration);
      break;

    case 'Month':
      now.setMonth(now.getMonth() + duration);
      break;

    case 'Week':
      now.setDate(now.getDate() + duration * 7);
      break;

    case 'Year':
      now.setFullYear(now.getFullYear() + duration);
      break;

    default:
      throw new Error(`Invalid duration type: ${durationType}`);
  }

  return now;
}
