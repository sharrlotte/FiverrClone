import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CloudinaryModule } from 'src/services/cloudinary/cloudinary.module';

@Module({
  controllers: [PostController],
  imports: [CloudinaryModule],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
