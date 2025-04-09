import api from '@/api/api';
import { PostDetail } from '@/api/post.api';

export async function getPost(id: string): Promise<PostDetail> {
  const result = await api.get(`/posts/${id}`);

  return result.data;
}

export async function visitPost(postId: string) {
  const result = await api.post(`/posts/${postId}/visit`, undefined);

  return result.data;
}
