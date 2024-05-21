import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { config } from 'process';
import { GithubOauthGuard } from 'src/auth/github/github.guard';
import { JwtAuthService } from 'src/auth/jwt/jwt.service';
import { AppConfig } from 'src/config/configuration';

@Controller('auth/github')
export class GithubOauthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private configService: ConfigService<AppConfig>,
  ) {}

  @Get()
  @UseGuards(GithubOauthGuard)
  async githubAuth() {}

  @Get('callback')
  @UseGuards(GithubOauthGuard)
  async githubAuthCallback(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const user = req.user as unknown as User;

    const { accessToken } = this.jwtAuthService.login(user);
    res.cookie('jwt', accessToken);

    return res.redirect(`${this.configService.get('url.frontend')}`);
  }
}
