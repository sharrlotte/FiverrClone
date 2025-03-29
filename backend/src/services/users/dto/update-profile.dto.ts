import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty({
    minLength: 4,
    maxLength: 40,
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  @IsOptional()
  username: string;

  @ApiProperty({
    minLength: 10,
    maxLength: 100,
  })
  @MaxLength(1000)
  @IsOptional()
  about: string;
}
