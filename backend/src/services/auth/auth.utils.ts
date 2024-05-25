import { Request } from 'express';
import { SessionDto } from 'src/services/auth/dto/session.dto';

export function getUser(req: Request): SessionDto | null {
  const user = req.user as unknown as any;

  if (!user) {
    return null;
  }

  return { id: user.sub, username: user.username, avatar: user.avatar, authorities: user.authorities, roles: user.roles };
}

export function getAuthUser(req: Request): SessionDto {
  const user = req.user as unknown as any;

  return { id: user.sub, username: user.username, avatar: user.avatar, authorities: user.authorities, roles: user.roles };
}
