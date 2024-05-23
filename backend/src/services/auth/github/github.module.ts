import { Module } from '@nestjs/common';
import { GithubOauthController } from './github.controller';
import { JwtAuthService } from 'src/services/auth/jwt/jwt.service';
import { GithubOauthStrategy } from 'src/services/auth/github/github.strategy';
import { UsersService } from 'src/services/users/users.service';

@Module({
  controllers: [GithubOauthController],
  providers: [JwtAuthService, UsersService, GithubOauthStrategy],
})
export class GithubModule {}
