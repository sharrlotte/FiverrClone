import { Module } from '@nestjs/common';
import { UsersController } from './services/users/users.controller';
import { UsersService } from './services/users/users.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './services/users/users.module';
import appConfig from './config/configuration';
import { PrismaModule } from 'src/services/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.development.env'],
      cache: true,
      load: [appConfig],
    }),
    AuthModule,
    UsersModule,
    PrismaModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
