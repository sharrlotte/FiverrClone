import { Injectable } from '@nestjs/common';
import { Chat } from '@prisma/client';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  private clients: Record<number, Socket> = {};

  addClient(id: number, client: Socket) {
    this.clients[id] = client;
  }

  removeClient(id: number) {
    delete this.clients[id];
  }

  sendMessageToUser(userId: number, content: Chat & { cId?: string }) {
    const socket = this.clients[userId];

    if (socket) {
      socket.emit('message', content);
    }
  }
}
