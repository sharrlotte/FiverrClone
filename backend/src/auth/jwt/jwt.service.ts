import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/types/auth';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: User) {
    const { id, username, avatar } = user;
    const payload: JwtPayload = {
      sub: id,
      displayName: username,
      avatar: avatar ?? '',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
