import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, MaxLength, Min } from 'class-validator';

export class NamePaginationQueryDto {
  @Min(0)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @Min(0)
  @Min(50)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  size: number;

  @MaxLength(100)
  name: string;
}
