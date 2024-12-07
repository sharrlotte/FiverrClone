import { DurationType } from '@prisma/client';

export function getDeliveryDate(durationType: DurationType, duration: number): Date {
  const now = new Date();

  switch (durationType) {
    case 'DAY':
      now.setDate(now.getDate() + duration);
      break;

    case 'HOUR':
      now.setHours(now.getHours() + duration);
      break;
    default:
      throw new Error(`Invalid duration type: ${durationType}`);
  }

  return now;
}
