import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import { OrderDetailResponse, OrderResponse } from 'src/services/order/dto/order.response';
import NotFound from 'src/error/NotFound';
import { getDeliveryDate } from 'src/shared/utils/date.utils';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(session: SessionDto, createOrderDto: CreateOrderDto) {
    const { packageId, postId } = createOrderDto;

    const post = await this.prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post === null) {
      throw new NotFound<CreateOrderDto>('postId');
    }

    const postPackage = await this.prisma.package.findUnique({
      where: {
        id: packageId,
      },
    });

    if (postPackage === null) {
      throw new NotFound<CreateOrderDto>('packageId');
    }

    const deliveryTime = getDeliveryDate(postPackage.durationType, postPackage.deliveryTime);

    const result = await this.prisma.order.create({
      data: {
        ...createOrderDto,
        userId: session.id,
        price: postPackage.price,
        revision: postPackage.revision,
        createdAt: new Date(),
        deliveryTime,
      },
    });

    return result;
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

  async findOne(id: number): Promise<OrderDetailResponse> {
    const result = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        post: true,
        package: true,
        user: true,
      },
    });

    if (result === null) {
      throw new NotFound('id');
    }

    return result;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
