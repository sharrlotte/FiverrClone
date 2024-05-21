import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { getUser } from 'src/auth/auth.utils';

@Controller('auth')
export class AuthController {
  @Get('@me')
  getProfile(@Req() req: Request) {
    return getUser(req);
  }
}
