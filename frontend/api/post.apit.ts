import api from '@/api/api';
import { CreatePostRequest } from '@/schema/post.schema';

export async function createPost(request: CreatePostRequest) {
  return api.post('/posts', request, {
    data: request,
  });
}
