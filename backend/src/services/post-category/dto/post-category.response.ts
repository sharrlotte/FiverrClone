import { Expose, Type } from 'class-transformer';

export class PostCategoryResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => PostParentCategoryResponse)
  parent: PostParentCategoryResponse | null;
}

export class PostParentCategoryResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
