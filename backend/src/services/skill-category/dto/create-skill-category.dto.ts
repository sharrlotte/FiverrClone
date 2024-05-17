import { ApiProperty } from '@nestjs/swagger';

export class CreateSkillCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
