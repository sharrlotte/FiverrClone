import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { Socket } from 'socket.io';
import { JwtAuthService } from 'src/services/jwt/jwt.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'socket',
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly socketService: SocketService,
    private readonly jwtService: JwtAuthService,
  ) {}

  handleConnection(client: Socket) {
    const id = this.getId(client);

    if (id) {
      this.socketService.addClient(id, client);
    }
  }
  handleDisconnect(client: Socket) {
    const id = this.getId(client);

    if (id) {
      this.socketService.removeClient(id);
    }
  }

  private getId(client: Socket) {
    const authHeader = client.handshake.auth['Authorization'];

    if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
      client._error('UnauthorizedException');
      client.disconnect();
      return;
    }
    const payload = this.jwtService.decode(authHeader.replace('Bearer ', ''));

    return payload.sub;
  }
}
