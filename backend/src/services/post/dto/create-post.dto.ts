import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsNotEmpty, IsNumber, IsOptional, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { HasMimeType, IsFiles, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';
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
  @IsNumber({}, { each: true })
  @ArrayUnique()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Type(() => Number)
  categories: Number[];

  @ApiProperty({
    isArray: true,
    minLength: 1,
    maxLength: 10,
    type: CreatePackageDto,
  })
  @IsNotEmpty()
  @ArrayUnique()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @ValidateNested({ each: true })
  @Type(() => CreatePackageDto)
  packages: Array<CreatePackageDto>;

  @IsFiles()
  @MaxFileSize(10e6, { each: true })
  // @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'], { each: true })
  images: Array<MemoryStoredFile>;

  @IsFiles()
  @IsOptional()
  @MaxFileSize(10e6, { each: true })
  // @HasMimeType(['image/jpeg', 'image/jpg', 'image/png'], { each: true })
  markdownImages: Array<MemoryStoredFile>;
}
