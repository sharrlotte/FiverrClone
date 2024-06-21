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
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.create(session, createOrderDto);
  }

  @Get()
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.findAll(session, query).then((items) => items.map((item) => plainToInstance(OrderResponse, item)));
  }

  @Get(':id')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }
  @Post(':id/cancel')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  cancel(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.cancel(session, id);
  }
  @Post(':id/reject')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  reject(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.reject(session, id);
  }
  @Post(':id/accept')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  accept(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.accept(session, id);
  }
  @Post(':id/finish')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  finish(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.finish(session, id);
  }
  @Post(':id/sellerCancel')
  @Roles(['USER'])
  @UseGuards(RolesGuard)
  sellerCancel(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const session = getSession(req);
    return this.orderService.sellerCancel(session, id);
  }
}
