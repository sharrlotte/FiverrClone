import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendNewOrder(user: User, email: string, url: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Thông báo đơn hàng mới',
        template: './new-order', // `.hbs` extension is appended automatically
        context: {
          name: user.username,
          url,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
  async sendOrderAccepted(user: User, email: string, url: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Thông báo đơn hàng đã được chấp nhận',
        template: './order-accepted', // `.hbs` extension is appended automatically
        context: {
          name: user.username,
          url,
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
