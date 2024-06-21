import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, ParseIntPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { OrderResponse } from 'src/services/order/dto/order.response';
import { plainToInstance } from 'class-transformer';
import { getAuthUser } from 'src/services/auth/auth.utils';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.orderService.create(session, createOrderDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto, @Req() req: Request) {
    const session = getAuthUser(req);
    return this.orderService.findAll(session, query).then((items) => items.map((item) => plainToInstance(OrderResponse, item)));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.remove(id);
  }
}
