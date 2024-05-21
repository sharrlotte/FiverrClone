import { Expose } from 'class-transformer';

export class SessionDto {
  @Expose()
  id: number;

  @Expose()
  displayName: string;

  @Expose()
  avatar: string;
}
