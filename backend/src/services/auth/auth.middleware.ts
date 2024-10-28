import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction, request } from 'express';
import { AppConfig } from 'src/config/configuration';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService<AppConfig>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req?.cookies?.jwt;

    if (!token) {
      //@ts-expect-error This is not an error
      request['user'] = null;
      return next();
    }
    try {
      const { sub, ...payload } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('auth.jwt.secret'),
      });

      //@ts-ignore
      request['user'] = { ...payload, id: +sub };
    } catch (error) {
      //TODO: Secure
      res.clearCookie('jwt');
    }

    next();
  }
}
