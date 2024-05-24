import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, MaxLength, Min } from 'class-validator';

export class TitlePaginationQueryDto {
  @Min(0)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ default: 0, minimum: 0 })
  page: number;

  @Min(0)
  @Max(50)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty({ default: 20, maximum: 50, minimum: 0 })
  size: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(100)
  title?: string;
}
