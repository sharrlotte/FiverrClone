import { Roles } from './../../shared/decorator/role.decorator';
import { Controller, Get, Post, Body, Param, Query, Req, ParseIntPipe, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { OrderResponse } from 'src/services/order/dto/order.response';
import { plainToInstance } from 'class-transformer';
import { getSession } from 'src/services/auth/auth.utils';
import { Request } from 'express';
import { RolesGuard } from 'src/shared/guard/role.guard';

@Controller('orders')
@Roles(['USER'])
@UseGuards(RolesGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.create(session, createOrderDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.findAll(session, query).then((items) => items.map((item) => plainToInstance(OrderResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }
  @Post(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.cancel(session, id);
  }
  @Post(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.reject(session, id);
  }
  @Post(':id/accept')
  accept(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.accept(session, id);
  }
  @Post(':id/finish')
  finish(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.finish(session, id);
  }
  @Post(':id/sellerCancel')
  sellerCancel(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.sellerCancel(session, id);
  }
}
