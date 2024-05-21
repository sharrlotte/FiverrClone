import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SessionDto } from 'src/auth/dto/session.dto';
import { JwtPayload } from 'src/types/auth';

@Injectable()
export class JwtAuthService {
  constructor(private jwtService: JwtService) {}

  login(user: SessionDto) {
    const { id, displayName, avatar } = user;
    const payload: JwtPayload = {
      sub: id,
      displayName,
      avatar: avatar ?? '',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
