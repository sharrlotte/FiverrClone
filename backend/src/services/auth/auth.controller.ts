import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { getUser } from 'src/services/auth/auth.utils';
import { SessionDto } from './dto/session.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService<AppConfig>) {}
  @Get('session')
  getProfile(@Req() req: Request): SessionDto {
    return plainToInstance(SessionDto, getUser(req));
  }

  @Get('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt');

    return res.redirect(`${this.configService.get('url.frontend')}`);
  }
}
