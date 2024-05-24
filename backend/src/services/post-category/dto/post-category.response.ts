import { Expose } from 'class-transformer';

export class PostCategoryResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  parentId: number;
}
