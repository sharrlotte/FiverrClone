import api from '@/api/api';
import { LoginRequest, RegisterRequest } from '@/schema/auth.schema';
import { Session } from '@/schema/user.schema';

export async function signin(request: LoginRequest): Promise<Session> {
  return api.post('/account/signin', request, {
    data: request,
  });
}

export async function signup(request: RegisterRequest) {
  return api.post('/account/signup', request, {
    data: request,
  });
}
