import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateSkillCategoryDto {
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
    maxLength: 100,
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(1000)
  description: string;
}
