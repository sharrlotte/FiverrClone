import { Expose, Type } from 'class-transformer';

export class RoleDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Type(() => AuthorityDto)
  authorities: AuthorityDto[];
}

export class AuthorityDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
