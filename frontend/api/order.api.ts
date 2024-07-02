import api from '@/api/api';
import { Package, Post } from '@/api/post.api';
import { PostOrderRequest, GetPostRequest } from '@/schema/post.schema';

export type PostInOrderResponse = Pick<Post, 'title' | 'id' | 'createdAt' | 'user'>;

export const orderStatuses = ['PENDING', 'ACCEPTED', 'REJECTED', 'CANCELLED', 'FINISHED'] as const;

export type OrderStatus = (typeof orderStatuses)[number];

export type Order = {
  id: number;
  postId: number;
  post: PostInOrderResponse;
  packageData: Package;
  deliveryTime: number;
  status: OrderStatus;
  user: { username: string };
};

export async function createPostOrder(request: PostOrderRequest) {
  const result = await api.post(`/orders`, request);

  return result.data;
}
export async function rejectPostOrder(orderId: number) {
  const result = await api.post(`/orders/${orderId}/reject`);

  return result.data;
}
export async function acceptPostOrder(orderId: number) {
  const result = await api.post(`/orders/${orderId}/accept`);

  return result.data;
}
export async function finishPostOrder(orderId: number) {
  const result = await api.post(`/orders/${orderId}/finish`);

  return result.data;
}
export async function cancelPostOrder(orderId: number) {
  const result = await api.post(`/orders/${orderId}/cancel`);

  return result.data;
}
export async function sellerCancelPostOrder(orderId: number) {
  const result = await api.post(`/orders/${orderId}/sellerCancel`);

  return result.data;
}

export async function getMyPostOrder(request: GetPostRequest & { status: OrderStatus[] }): Promise<Order[]> {
  const result = await api.get('/users/@me/orders', {
    params: request,
    paramsSerializer: {
      indexes: null,
    },
  });

  return result.data;
}

export async function getCustomerPostOrder(request: GetPostRequest & { status: OrderStatus[] }): Promise<Order[]> {
  const result = await api.get('/orders', {
    params: request,
    paramsSerializer: {
      indexes: null,
    },
  });

  return result.data;
}
