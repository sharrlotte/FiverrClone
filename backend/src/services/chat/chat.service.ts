import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SocketService } from 'src/services/socket/socket.service';

@Injectable()
export class ChatService {
  constructor(
    private prismaService: PrismaService,
    private socketService: SocketService,
  ) {}
  async createMessage(senderId: number, receiverId: number, content: string, cId: string) {
    const userId1 = senderId > receiverId ? senderId : receiverId;
    const userId2 = senderId <= receiverId ? senderId : receiverId;

    let chatRoom = await this.prismaService.chatRoom.upsert({
      where: {
        user_map: {
          userId1,
          userId2,
        },
      },
      create: {
        userId1,
        userId2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      update: {
        updatedAt: new Date(),
      },
    });

    const result = await this.prismaService.chat.create({
      data: {
        content,
        userId: senderId,
        roomId: chatRoom.id,
        createdAt: new Date(),
      },
    });

    this.socketService.sendMessageToUser(receiverId, result);
    this.socketService.sendMessageToUser(senderId, { ...result, cId });

    return { ...result, cId };
  }

  async getMessagesByUsers(currentUserId: number, targetUserId: number, limit: number, cursor?: number) {
    const userId1 = currentUserId > targetUserId ? currentUserId : targetUserId;
    const userId2 = currentUserId <= targetUserId ? currentUserId : targetUserId;

    const result = await this.prismaService.chatRoom.findFirst({
      where: {
        userId1,
        userId2,
      },
      select: {
        chat: {
          take: limit,
          ...(cursor && {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }),
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return result?.chat ?? [];
  }
}
