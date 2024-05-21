import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { getUser } from 'src/auth/auth.utils';

@Controller('auth')
export class AuthController {
  @Get('@me')
  @UseGuards(AuthGuard)
  getProfile(@Req() req: Request) {
    console.log({ user: req.user });
    return getUser(req);
  }
}
