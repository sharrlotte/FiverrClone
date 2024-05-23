import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { JwtStrategy } from 'src/services/auth/jwt/jwt.strategy';

@Module({
  providers: [JwtAuthService],
  exports: [JwtAuthService, JwtStrategy],
})
export class JwtModule {}
