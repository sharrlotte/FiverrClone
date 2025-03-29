import { Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';
import { TransportType } from '@nestjs-modules/mailer/dist/interfaces/mailer-options.interface';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (config: ConfigService<AppConfig>): MailerOptions => ({
        transport: {
          host: config.get('transport.host'),
          port: 465,
          auth: {
            user: config.get('transport.user'),
            pass: config.get('transport.password'),
          },
        } as TransportType,
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
