import { Expose } from 'class-transformer';

export class ChatDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  userId: number;

  @Expose()
  cId: string;

  @Expose()
  createdAt: Date;
}
