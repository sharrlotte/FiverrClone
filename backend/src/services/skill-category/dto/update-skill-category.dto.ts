import { CreateSkillCategoryDto } from 'src/services/skill-category/dto/create-skill-category.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateSkillCategoryDto extends PartialType(CreateSkillCategoryDto) {}
