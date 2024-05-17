import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Max, MaxLength, Min } from 'class-validator';

export class NamePaginationQueryDto {
  @Min(0)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  page: number;

  @Min(0)
  @Max(50)
  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @ApiProperty()
  size: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @MaxLength(100)
  name?: string;
}
