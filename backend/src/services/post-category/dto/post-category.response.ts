import { Expose } from 'class-transformer';

export class PostCategoryResponseDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  parentId: number;
}
