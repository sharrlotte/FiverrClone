import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from 'src/services/users/users.controller';
import { PostModule } from 'src/services/post/post.module';

@Module({
  imports: [PostModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
