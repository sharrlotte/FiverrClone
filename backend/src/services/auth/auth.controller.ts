import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { getSessionOrNull } from 'src/services/auth/auth.utils';
import { SessionResponseDto } from './dto/session.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';
import { plainToInstance } from 'class-transformer';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService<AppConfig>) {}
  @Get('session')
  getProfile(@Req() req: Request): SessionResponseDto | null {
    const session = getSessionOrNull(req);

    if (session === null) {
      return null;
    }

    return plainToInstance(SessionResponseDto, {
      ...session,
      rolePicked: !session.roles.some((role) => role === 'CANDIDATE' || role === 'RECRUITER'),
    });
  }

  @Get('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');

    return res.redirect(`${this.configService.get('url.frontend')}`);
  }
}
