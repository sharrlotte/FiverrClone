import { CreateSkillCategoryRequest, GetSkillCategoryRequest } from '@/schema/skill-category.schema';
import api from './api';

export type SkillCategory = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

export async function createSkillCategory(request: CreateSkillCategoryRequest) {
  return api.post('/skill-categories', request, {
    data: request,
  });
}

export async function getSkillCategory(request: GetSkillCategoryRequest): Promise<SkillCategory[]> {
  const result = await api.get('/skill-categories', { params: request });

  return result.data;
}
