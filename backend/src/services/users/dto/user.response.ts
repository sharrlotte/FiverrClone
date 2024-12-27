import { Expose } from 'class-transformer';
import { SkillCategoryResponse } from 'src/services/skill-category/dto/skill-category-response';

export class UserResponse {
  @Expose()
  id: number;

  @Expose()
  avatar: string | null;

  @Expose()
  username: string;

  @Expose()
  about: string;

  @Expose()
  welcomeMessage: string;
}

export class UserProfileResponse {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  about: string;

  @Expose()
  avatar: string | null;

  @Expose()
  skills: SkillCategoryResponse[];
}

export class UserWithRolesAndAuthorities {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  about: string;

  @Expose()
  avatar: string | null;

  @Expose()
  roles: string[];

  @Expose()
  authorities: string[];
}
