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

  @Expose()
  @Type(() => PostChildCategoryResponse)
  children: PostChildCategoryResponse[];
}

export class PostParentCategoryResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
export class PostChildCategoryResponse {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
