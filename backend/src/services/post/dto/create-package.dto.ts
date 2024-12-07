import { ApiProperty } from '@nestjs/swagger';
import { DurationType } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from 'class-validator';

export class CreatePackageDto {
  @ApiProperty({
    minLength: 1,
    maxLength: 40,
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(40)
  title: string;

  @ApiProperty({
    minLength: 1,
    maxLength: 100,
  })
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  description: string;

  @ApiProperty({
    minimum: 0,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Type(() => Number)
  revision: number;

  @ApiProperty({
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Type(() => Number)
  deliveryTime: number;

  @ApiProperty({
    enum: ['DAY', 'HOUR'] as const,
  })
  @IsNotEmpty()
  @IsEnum(['DAY', 'HOUR'] as const)
  durationType: DurationType;

  @IsNotEmpty()
  @IsInt()
  @Min(100000)
  @Type(() => Number)
  price: number;

  @ApiProperty({
    required: false,
  })
  special: Record<string, string>;
}
