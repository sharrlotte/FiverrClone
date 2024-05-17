import { Module } from '@nestjs/common';
import { GithubOauthController } from './github.controller';
import { JwtAuthService } from 'src/auth/jwt/jwt.service';

@Module({
  controllers: [GithubOauthController],
  providers: [JwtAuthService],
})
export class GithubModule {}
