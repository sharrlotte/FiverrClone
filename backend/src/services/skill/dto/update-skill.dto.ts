import { PartialType } from '@nestjs/swagger';
import { CreateSkillDto } from 'src/services/skill/dto/create-skill.dto';

export class UpdateSkillDto extends PartialType(CreateSkillDto) {}
