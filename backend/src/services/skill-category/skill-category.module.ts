import { Module } from '@nestjs/common';
import { SkillCategoryService } from './skill-category.service';
import { SkillCategoryController } from './skill-category.controller';

@Module({
  controllers: [SkillCategoryController],
  providers: [SkillCategoryService],
})
export class SkillCategoryModule {}
