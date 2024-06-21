import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
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

  async cancel(session: SessionDto, id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (order === null) {
      throw new NotFound('id');
    }

    if (order.userId !== session.id) {
      throw new ForbiddenException();
    }

    const result = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 'Cancelled',
      },
    });

    return result;
  }
  async sellerCancel(session: SessionDto, id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        post: true,
      },
    });

    if (order === null) {
      throw new NotFound('id');
    }

    if (order.post.userId !== session.id) {
      throw new ForbiddenException();
    }

    if (order.status !== 'Accepted') {
      throw new BadRequestException({
        message: 'Can not cancel this request',
        reason: {
          current: order.status,
          accept: 'Accepted',
        },
      });
    }

    const result = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 'Cancelled',
      },
    });

    return result;
  }

  async accept(session: SessionDto, id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        post: true,
      },
    });

    if (order === null) {
      throw new NotFound('id');
    }

    if (order.post.userId !== session.id) {
      throw new ForbiddenException();
    }

    if (order.status !== 'Pending') {
      throw new BadRequestException({
        message: 'Can not accept this request',
        reason: {
          current: order.status,
          accept: 'Pending',
        },
      });
    }

    const result = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 'Accepted',
      },
    });

    return result;
  }
  async reject(session: SessionDto, id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        post: true,
      },
    });

    if (order === null) {
      throw new NotFound('id');
    }

    if (order.post.userId !== session.id) {
      throw new ForbiddenException();
    }

    if (order.status !== 'Pending') {
      throw new BadRequestException({
        message: 'Can not reject this request',
        reason: {
          current: order.status,
          accept: 'Pending',
        },
      });
    }

    const result = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 'Rejected',
      },
    });

    return result;
  }
  async finish(session: SessionDto, id: number) {
    const order = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        post: true,
      },
    });

    if (order === null) {
      throw new NotFound('id');
    }

    if (order.post.userId !== session.id) {
      throw new ForbiddenException();
    }

    if (order.status !== 'Accepted') {
      throw new BadRequestException({
        message: 'Can not finish this request',
        reason: {
          current: order.status,
          accept: 'Accepted',
        },
      });
    }

    const result = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 'Finished',
      },
    });

    return result;
  }
}
