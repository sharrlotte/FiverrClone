import api from '@/api/api';
import { Session } from '@/schema/user.schema';
import { cookies } from 'next/headers';

export async function getSession(): Promise<Session | null> {
  const result = await api.get('/auth/session', { headers: { Cookie: cookies().toString() } });

  return result.data;
}
