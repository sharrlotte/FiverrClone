import api from '@/api/api';
import { User } from '@/schema/user.schema';
import { cookies } from 'next/headers';

export async function getSession(): Promise<User> {
	const result = await api.get('/auth/@me', { headers: { Cookie: cookies().toString() } });

	return result.data;
}
