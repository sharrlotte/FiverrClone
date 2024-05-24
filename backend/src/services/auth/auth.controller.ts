import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { getUser } from 'src/services/auth/auth.utils';
import { SessionDto } from './dto/session.dto';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';

@Controller('auth')
export class AuthController {
  constructor(private configService: ConfigService<AppConfig>) {}
  @Get('session')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request): SessionDto {
    return plainToInstance(SessionDto, getUser(req));
  }
  @Get('logout')
  @UseGuards(AuthGuard)
  logout(@Res({ passthrough: true }) res: Response) {
    res.cookie('jwt', '', {
      httpOnly: true,
    });

    return res.redirect(`${this.configService.get('url.frontend')}`);
  }
}
