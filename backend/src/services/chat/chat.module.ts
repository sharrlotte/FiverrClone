import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { SocketModule } from 'src/services/socket/socket.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
  imports: [SocketModule],
})
export class ChatModule {}
