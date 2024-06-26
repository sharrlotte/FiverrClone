import { Expose } from 'class-transformer';

export class SessionDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  avatar: string | null;

  @Expose()
  roles: string[];

  @Expose()
  authorities: string[];
}

export class SessionResponseDto extends SessionDto {
  @Expose()
  rolePicked: boolean;
}
