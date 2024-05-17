export type AuthProvider = 'github' | 'google' | 'facebook';

export type JwtPayload = {
  sub: number;
  iat?: number;
  exp?: number;
  displayName: string;
  photo?: string;
};
