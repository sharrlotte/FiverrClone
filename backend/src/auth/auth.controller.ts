import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { getUser } from 'src/auth/auth.utils';
import { SessionDto } from 'src/auth/dto/session.dto';

@Controller('auth')
export class AuthController {
  @Get('@me')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request): SessionDto {
    return plainToInstance(SessionDto, getUser(req));
  }
}
