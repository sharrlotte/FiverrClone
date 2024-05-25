import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AuthGuard } from 'src/services/auth/auth.guard';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: true,
    }),
  );

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.getHttpAdapter().getInstance().set('etag', false);
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.use(helmet());

  const authGuard = app.get(AuthGuard);
  app.useGlobalGuards(authGuard);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
    }),
  );

  const config = new DocumentBuilder() //
    .setTitle('API')
    .setVersion('1.0')
    .setDescription('API description')
    .addTag('v1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);

  await app.listen(8080);
}
bootstrap();
