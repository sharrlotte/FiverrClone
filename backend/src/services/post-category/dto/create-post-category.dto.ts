import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class CreatePostCategoryDto {
  @ApiProperty({
    minLength: 4,
    maxLength: 100,
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    minLength: 4,
    maxLength: 1000,
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(1000)
  description: string;

  parentId: number;
}
