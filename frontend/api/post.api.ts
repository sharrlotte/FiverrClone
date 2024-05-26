import api from '@/api/api';
import { DurationType } from '@/constant/enum';
import { CreatePostRequest, GetPostRequest } from '@/schema/post.schema';

export type Package = { title: string; description: string; revision: number; deliveryTime: number; durationType: DurationType; price: number };

export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  totalStars: number;
  totalCount: number;
  thumbnail: string;
  favorites: number;
  isFavorite: boolean;
};

export async function getMyPost(request: GetPostRequest): Promise<Post[]> {
  const result = await api.get('/users/@me/posts', { params: request });

  return result.data;
}

export async function getMyFavoritePost(request: GetPostRequest): Promise<Post[]> {
  const result = await api.get('/users/@me/favorite-posts', { params: request });

  return result.data;
}
export async function getMyPostBrowsingHistory(request: GetPostRequest): Promise<Post[]> {
  const result = await api.get('/users/@me/post-browsing-history', { params: request });

  return result.data;
}

export async function createPost({ thumbnail, previews, ...request }: CreatePostRequest) {
  const result = await api.post('/posts', request);

  const thumbnailForm = new FormData();
  thumbnailForm.append('thumbnail', thumbnail);

  const previewsForm = new FormData();
  previewsForm.append('previews', previews as any);

  const postThumbnail = api.post(`/posts/${result.data.id}/thumbnail`, thumbnailForm, { data: thumbnailForm });
  const postPreviews = api.post(`/posts/${result.data.id}/previews`, previewsForm, { data: previewsForm });

  await Promise.all([postThumbnail, postPreviews]);

  return result.data;
}

export async function favoritePost(postId: number) {
  const result = await api.post(`/posts/${postId}/favorite`);

  return result.data;
}
export async function visitPost(postId: number) {
  const result = await api.post(`/posts/${postId}/visit`);

  return result.data;
}
