export type AuthProvider = 'github' | 'google' | 'facebook';

export type JwtPayload = {
  sub: number;
  iat?: number;
  exp?: number;
  username: string;
  avatar: string | null;
  roles: string[];
  authorities: string[];
};
