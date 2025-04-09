import api from '@/api/api';
import { UpdateProfileRequest, UserProfile } from '@/schema/user.schema';

export async function getProfile(id: number): Promise<UserProfile> {
  const result = await api.get(`/users/${id}/profile`);

  return result.data;
}

export async function getMyProfile(): Promise<UserProfile> {
  const result = await api.get(`/users/profile`);

  return result.data;
}

export async function updateProfile(id: number, payload: UpdateProfileRequest) {
  const result = await api.patch(`/users/${id}/profile`);

  return result.data;
}
