import api from '@/api/api';

export type Role = {
  id: number;
  name: string;
  authorities: Authority[];
};

export type Authority = {
  id: number;
  name: string;
};

export async function getRoles(): Promise<Role[]> {
  const result = await api.get('/roles');
  return result.data;
}
export async function getAuthorities(): Promise<Authority[]> {
  const result = await api.get('/authorities');
  return result.data;
}

export async function updateAuthorities(id: number, authoritiesId: number[]): Promise<void> {
  const result = await api.put(`/roles/${id}`, { authorities: authoritiesId });
  return result.data;
}
