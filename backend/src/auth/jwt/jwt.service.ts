import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { JwtPayload } from 'src/types/auth';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: User) {
    const { id, username } = user;
    const payload: JwtPayload = {
      sub: id,
      displayName: username,
      //TODO: User avatar
      photo: '',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
