import { CreateSkillRequest, GetSkillRequest } from '@/schema/skill.schema';
import api from './api';

export type Skill = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

export async function createSkill(request: CreateSkillRequest) {
  return api.post('/skills', request, {
    data: request,
  });
}

export async function getSkills(request: GetSkillRequest): Promise<Skill[]> {
  const result = await api.get('/skills', { params: request });

  return result.data;
}

export async function getSkill(request: GetSkillRequest): Promise<Skill[]> {
  const result = await api.get('/skills', { params: request });

  return result.data;
}

export async function updaterSkill(id: number, request: CreateSkillRequest) {
  return api.patch(`/skills/${id}`, request, {
    data: request,
  });
}

export async function deleteSkill(id: number) {
  return api.delete(`/skills/${id}`);
}
