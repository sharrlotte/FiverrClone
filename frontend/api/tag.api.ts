import { CreateTagRequest, GetTagRequest } from '@/schema/tag.sechema';
import api from './api';

export type Tag = {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
};

export async function createTag(request: CreateTagRequest) {
  return api.post('/tags', request, {
    data: request,
  });
}

export async function getTag(request: GetTagRequest): Promise<Tag[]> {
  const result = await api.get('tags', { params: request });

  return result.data;
}

export async function updaterTag(id: number, request: CreateTagRequest) {
  return api.patch(`/tags/${id}`, request, {
    data: request,
  });
}

export async function deleteTag(id: number) {
  return api.delete(`/tags/${id}`);
}
