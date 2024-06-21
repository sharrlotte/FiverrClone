import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import { OrderResponse } from 'src/services/order/dto/order.response';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    return 'This action adds a new order';
  }

  async findAll(session: SessionDto, { size, page }: PaginationQueryDto): Promise<OrderResponse[]> {
    const result = await this.prisma.order.findMany({
      where: {
        post: {
          userId: session.id,
        },
      },
      include: {
        post: true,
      },
      take: size,
      skip: size * (page - 1),
    });

    return result.map((item) => ({ ...item }));
  }

  async findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
