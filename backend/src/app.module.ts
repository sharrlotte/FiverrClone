import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthMiddleware } from 'src/services/auth/auth.middleware';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';
import { OrderModule } from './services/order/order.module';
import { PackagesModule } from './services/packages/packages.module';
import { AuthoritiesModule } from './services/authorities/authorities.module';
import { RoleAuthoritiesModule } from './services/role-authorities/role-authorities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.development.env'],
      cache: true,
      load: [appConfig],
    }),
    NestjsFormDataModule.config({ isGlobal: true, storage: MemoryStoredFile }),
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
    OrderModule,
    PackagesModule,
    AuthoritiesModule,
    RoleAuthoritiesModule,
  ],
  providers: [CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
