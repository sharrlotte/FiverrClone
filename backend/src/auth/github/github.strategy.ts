import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-github';

import { UsersService } from '../../services/users/users.service';
import { AppConfig } from 'src/config/configuration';

@Injectable()
export class GithubOauthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private configService: ConfigService<AppConfig>,
    private usersService: UsersService,
  ) {
    super({
      clientID: configService.get<string>('auth.github.clientId'),
      clientSecret: configService.get<string>('auth.github.clientSecret'),
      callbackURL: configService.get<string>('auth.github.callbackURL'),
      scope: ['public_profile'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: Profile) {
    const { id } = profile;
    const user = await this.usersService.findOrCreate(id, 'github');

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}