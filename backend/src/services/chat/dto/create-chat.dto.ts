import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(1000)
  content: string;

  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  cId: string;
}
