import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from 'src/services/auth/auth.module';
import { PrismaModule } from 'src/services/prisma/prisma.module';
import { RoleModule } from 'src/services/role/role.module';
import { SkillCategoryModule } from 'src/services/skill-category/skill-category.module';
import { SkillModule } from 'src/services/skill/skill.module';
import { TagModule } from 'src/services/tag/tag.module';
import { UsersModule } from 'src/services/users/users.module';
import { PostCategoryModule } from './services/post-category/post-category.module';
import { PostModule } from './services/post/post.module';
import { CloudinaryService } from './services/cloudinary/cloudinary.service';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
import appConfig from 'src/config/configuration';
import { MulterModule } from '@nestjs/platform-express';

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
    TagModule,
    SkillModule,
    SkillCategoryModule,
    RoleModule,
    PostCategoryModule,
    PostModule,
    CloudinaryModule,
    MulterModule.register({
      dest: './upload',
    }),
  ],
  providers: [CloudinaryService],
})
export class AppModule {}
