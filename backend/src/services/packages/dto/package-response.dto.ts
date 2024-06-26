import { DurationType } from '@prisma/client';
import { Expose, Type } from 'class-transformer';

export class PackageResponse {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  revision: number;

  @Expose()
  deliveryTime: number;

  @Expose()
  durationType: DurationType;

  @Expose()
  @Type(() => BigInt)
  price: BigInt;
}
