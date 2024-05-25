import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { CreatePackageDto } from 'src/services/post/dto/create-package.dto';

export class CreatePostDto {
  @ApiProperty({
    minLength: 4,
    maxLength: 200,
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    minLength: 100,
    maxLength: 10000,
  })
  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(10000)
  content: string;
  
  @ApiProperty({
    minLength: 1,
    maxLength: 10,
  })
  @IsNotEmpty()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  categories: number[];

  @ApiProperty({
    isArray: true,
    minLength: 1,
    maxLength: 10,
    type: CreatePackageDto,
  })
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreatePackageDto)
  packages: CreatePackageDto[];
}
