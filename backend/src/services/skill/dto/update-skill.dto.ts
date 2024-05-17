import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  categoryId: number;
}
