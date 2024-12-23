import { CreatePostCategoryRequest, GetPostCategoryRequest } from '@/schema/post-category.schema';
import api from './api';

export type PostCategory = {
  id: number;
  parentId: number
  name: string;
  description: string;
  createdAt: Date;
  parent: {
    id: number;
    name: string;
    description: string;
  } | null;

  children: {
    id: number;
    name: string;
    description: string;
  }[];
};

export async function createPostCategory(request: CreatePostCategoryRequest) {
  return api.post('/post-categories', request, {
    data: request,
  });
}

export async function getPostCategoryById(id: number): Promise<PostCategory> {
  const result = await api.get(`/post-categories/${id}`);

  return result.data;
}
export async function getPostCategory(request: GetPostCategoryRequest): Promise<PostCategory[]> {
  const result = await api.get('/post-categories', { params: request });

  return result.data;
}

export async function updaterPostCategory(id: number, request: CreatePostCategoryRequest) {
  return api.patch(`/post-categories/${id}`, request, {
    data: request,
  });
}

export async function deletePostCategory(id: number) {
  return api.delete(`/post-categories/${id}`);
}
