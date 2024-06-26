import api from '@/api/api';
import { PostDetail } from '@/api/post.api';
import { cookies } from 'next/headers';

export async function getPost(id: string): Promise<PostDetail> {
  const result = await api.get(`/posts/${id}`, { headers: { Cookie: cookies().toString() } });

  return result.data;
}

export async function visitPost(postId: string) {
  const result = await api.post(`/posts/${postId}/visit`, undefined, { headers: { Cookie: cookies().toString() } });

  return result.data;
}
