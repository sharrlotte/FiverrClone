import { Expose } from 'class-transformer';

export class AuthorityDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
