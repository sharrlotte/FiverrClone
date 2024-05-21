import api from '@/api/api';

export async function getSession(): Promise<any> {
	return (await api.get('/auth/@me')).data;
}
