import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, MaxLength, Min, MinLength } from 'class-validator';

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
  @Min(0)
  revision: number;

  @IsNotEmpty()
  deliveryTime: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(100000)
  price: number;

  @ApiProperty({
    required: false,
  })
  special: Record<string, string>;
}
