import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [MailModule]
})
export class OrderModule {}
