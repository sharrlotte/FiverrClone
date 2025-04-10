import api from '@/api/api';
import { DurationType } from '@/constant/enum';
import { GetPostRequest, CreatePostRequest } from '@/schema/post.schema';
import { toFormData } from 'axios';

export type Package = { title: string; description: string; revision: number; deliveryTime: number; durationType: DurationType; price: number };

export type PackageResponse = { id: number; title: string; description: string; revision: number; deliveryTime: number; durationType: DurationType; price: number };

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
  packages: PackageResponse[];
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

export async function createPost({ content, images, packages, ...request }: CreatePostRequest) {
  const form = toFormData(
    {
      content: content.text,
      ...request,
    },
    new FormData(),
    {
      dots: false,
      indexes: false,
      metaTokens: true,
    },
  );

  packages.forEach((packageData, index) => {
    Object.entries(packageData).forEach(([key, value]) => form.append(`packages[${index}].${key}`, value));
  });

  images.forEach((file) => form.append('images', file));
  content.images.forEach(({ file, url }) => form.append('markdownImages', file, url));

  const result = await api.post('/posts', form, { data: form });
  return result.data;
}

export async function favoritePost(postId: number) {
  const result = await api.post(`/posts/${postId}/favorite`);

  return result.data;
}
