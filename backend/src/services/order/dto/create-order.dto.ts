import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  postId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  packageId: number;
}
