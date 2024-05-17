import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class PaginationQueryDto {
  @Min(0)
  @IsInt()
  @Type(() => Number)
  page: number;

  @Min(0)
  @Min(50)
  @IsInt()
  @Type(() => Number)
  size: number;
}
