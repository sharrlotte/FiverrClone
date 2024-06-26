import { Expose } from 'class-transformer';

export class SkillCategoryResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
