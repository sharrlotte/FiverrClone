import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { AuthGuard } from 'src/services/auth/auth.guard';
import { getUser } from 'src/services/auth/auth.utils';
import { SessionDto } from './dto/session.dto';


@Controller('auth')
export class AuthController {

  @Get('session')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request): SessionDto {
    return plainToInstance(SessionDto, getUser(req));
  }
}
