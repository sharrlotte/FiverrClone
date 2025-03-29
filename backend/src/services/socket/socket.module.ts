import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { JwtModule } from 'src/services/jwt/jwt.module';

@Module({
  providers: [SocketGateway, SocketService],
  exports: [SocketService],
  imports: [JwtModule],
})
export class SocketModule {}
