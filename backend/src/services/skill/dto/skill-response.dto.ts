import { Expose } from 'class-transformer';

export class SkillResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
