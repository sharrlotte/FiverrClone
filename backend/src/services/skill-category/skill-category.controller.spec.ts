import { Test, TestingModule } from '@nestjs/testing';
import { SkillCategoryController } from './skill-category.controller';
import { SkillCategoryService } from './skill-category.service';

describe('SkillCategoryController', () => {
  let controller: SkillCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillCategoryController],
      providers: [SkillCategoryService],
    }).compile();

    controller = module.get<SkillCategoryController>(SkillCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
