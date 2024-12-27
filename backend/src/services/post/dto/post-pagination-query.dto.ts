import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, MaxLength } from 'class-validator';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';

export const postSort = ['favorites'] as const;

export type PostSort = (typeof postSort)[number];

export class PostPaginationQueryDto extends PaginationQueryDto {
  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(100)
  title?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(100)
  @IsEnum(postSort)
  sort?: PostSort;

  @IsOptional()
  categoryId?: string;

  @IsOptional()
  userId?: string;
}
