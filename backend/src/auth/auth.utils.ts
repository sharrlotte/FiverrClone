import { Request } from 'express';
import { SessionDto } from 'src/auth/dto/session.dto';

export function getUser(req: Request): SessionDto {
  const user = req.user as unknown as any;

  return { id: user.sub, displayName: user.displayName, avatar: user.avatar };
}
