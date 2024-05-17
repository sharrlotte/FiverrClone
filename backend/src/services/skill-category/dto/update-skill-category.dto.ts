import { ApiProperty } from '@nestjs/swagger';

export class UpdateSkillCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;
}
