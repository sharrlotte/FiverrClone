import api from '@/api/api';
import { DurationType } from '@/constant/enum';
import { CreatePostRequest, GetPostRequest, PostOrderRequest } from '@/schema/post.schema';
import { toFormData } from 'axios';

export type Package = { id: number; title: string; description: string; revision: number; deliveryTime: number; durationType: DurationType; price: number };

export type Post = {
  id: number;
  userId: number;
  title: string;
  content: string;
  totalStars: number;
  starsCount: number;
  images: string[];
  favorites: number;
  isFavorite: boolean;
  createdAt: number;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
};

export type PostDetail = {
  id: number;
  userId: number;
  title: string;
  content: string;
  totalStars: number;
  starsCount: number;
  images: string[];
  favorites: number;
  isFavorite: boolean;
  createdAt: number;
  user: {
    id: number;
    username: string;
    avatar: string;
  };
  packages: Package[];
};

export type PostInOrderResponse = Pick<Post, 'title' | 'id' | 'createdAt' | 'user'>;

export const orderStatuses = ['Pending', 'Accepted', 'Rejected', 'Cancelled', 'Finished'] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export type Order = {
  id: number;
  postId: number;
  post: PostInOrderResponse;
  package: Package;
  deliveryTime: number;
  status: OrderStatus;
};

export async function getPosts(request: GetPostRequest): Promise<Post[]> {
  const result = await api.get('/posts', { params: request });

  return result.data;
}

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

export async function getMyPostOrder(request: GetPostRequest & { status: OrderStatus[] }): Promise<Order[]> {
  const result = await api.get('/users/@me/orders', { params: request });

  return result.data;
}

export async function createPost({ content, images, ...request }: CreatePostRequest) {
  const form = toFormData({
    content: content.text,
    ...request,
  });

  images.forEach((file) => form.append('images', file));
  content.images.forEach(({ file, url }) => form.append('markdownImages', file, url));

  const result = await api.post('/posts', form);
  return result.data;
}

export async function favoritePost(postId: number) {
  const result = await api.post(`/posts/${postId}/favorite`);

  return result.data;
}

export async function createPostOrder(request: PostOrderRequest) {
  const result = await api.post(`/orders`, request);

  return result.data;
}
export async function cancelPostOrder(orderId: number) {
  const result = await api.post(`/orders/${orderId}/cancel`);

  return result.data;
}
