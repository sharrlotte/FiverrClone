import { Controller, Get, Post, Body, Param, Query, Req } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { getSession } from 'src/services/auth/auth.utils';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { ChatDto } from 'src/services/chat/dto/chat.dto';

@Controller('messages')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Req() request: Request, @Body() { userId, content, cId }: CreateChatDto) {
    const session = getSession(request);

    return this.chatService.createMessage(session.id, userId, content, cId).then((item) => plainToInstance(ChatDto, item));
  }

  @Get(':targetUserId')
  async getMessagesByUsers(@Req() request: Request, @Param('targetUserId') targetUserId: number, @Query('cursor') cursor?: number, @Query('limit') limit: number = 20) {
    const session = getSession(request);

    return this.chatService.getMessagesByUsers(session.id, targetUserId, limit, cursor).then((items) => items.map((item) => plainToInstance(ChatDto, item)));
  }
}
