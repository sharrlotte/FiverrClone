import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService<AppConfig>) => ({
        transport: {
          host: config.get('transport.host'),
          secure: false,
          auth: {
            user: config.get('transport.user'),
            pass: config.get('transport.password'),
          },
        },
        defaults: {
          from: config.get('transport.from'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
