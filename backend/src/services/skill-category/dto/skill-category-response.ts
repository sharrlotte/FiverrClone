import { Expose } from 'class-transformer';

export class SkillCategoryResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
