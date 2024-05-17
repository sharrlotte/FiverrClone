import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
@Controller('auth')
export class AuthController {
  @Get('@me')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
