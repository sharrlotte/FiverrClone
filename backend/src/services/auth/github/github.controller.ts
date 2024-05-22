import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { getUser } from 'src/services/auth/auth.utils';
import { GithubOauthGuard } from 'src/services/auth/github/github.guard';
import { JwtAuthService } from 'src/services/auth/jwt/jwt.service';
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
    const user = getUser(req);

    if (!user) {
      return res.redirect(`${this.configService.get('url.frontend')}`);
    }

    const { accessToken } = this.jwtAuthService.login(user);
    // TODO: Turn on secure in production env
    res.cookie('jwt', accessToken, { httpOnly: true, secure: false });

    return res.redirect(`${this.configService.get('url.frontend')}`);
  }
}
