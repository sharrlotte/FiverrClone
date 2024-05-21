import { Expose } from 'class-transformer';

export class SkillResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  createdAt: number;
}
