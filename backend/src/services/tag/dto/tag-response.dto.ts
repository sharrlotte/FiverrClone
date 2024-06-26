import { Expose } from 'class-transformer';

export class TagResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
