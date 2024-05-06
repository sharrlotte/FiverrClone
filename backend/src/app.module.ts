import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { ConfigModule } from '@nestjs/config';
import envSchema from 'src/config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.development.env'],
      cache: true,
      validationSchema: envSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
