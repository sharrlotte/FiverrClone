import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt.service';
import { JwtStrategy } from 'src/services/jwt/jwt.strategy';

@Module({
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService],
})
export class JwtModule {}
