import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationQueryDto, PaginationQueryDto } from 'src/shared/dto/pagination-query.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { SessionDto } from 'src/services/auth/dto/session.dto';
import { OrderDetailResponse, OrderResponse } from 'src/services/order/dto/order.response';
import NotFound from 'src/error/NotFound';
import { getDeliveryDate } from 'src/shared/utils/date.utils';
import Conflict from 'src/error/Conflict';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(session: SessionDto, createOrderDto: CreateOrderDto) {
    const { packageId, postId } = createOrderDto;

    const order = await this.prisma.order.findFirst({
      where: {
        userId: session.id,
        postId,
      },
    });

    if (order) {
      throw new Conflict('Order already exists');
    }

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

    const result = await this.prisma.order.create({
      data: {
        ...createOrderDto,
        userId: session.id,
        price: postPackage.price,
        revision: postPackage.revision,
        createdAt: new Date(),
        deliveryTime: new Date(),
      },
    });

    return result;
  }

  async findAll(session: SessionDto, { size, page, status }: OrderPaginationQueryDto): Promise<OrderResponse[]> {
    const result = await this.prisma.order.findMany({
      where: {
        status: {
          in: status ? (Array.isArray(status) ? status : [status]) : [],
        },
        post: {
          userId: session.id,
        },
      },
      include: {
        user: true,
        package: true,
        post: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            postImages: {
              select: {
                link: true,
              },
            },
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
      },
      take: size,
      skip: size * (page - 1),
    });

    return result.map((item) => {
      const post = { ...item.post, images: item.post.postImages.map(({ link }) => link) };

      return { ...item, post };
    });
  }

  async findOne(id: number): Promise<OrderDetailResponse> {
    const result = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        package: true,
        post: {
          select: {
            id: true,
            title: true,
            createdAt: true,
            postImages: {
              select: {
                link: true,
              },
            },
            user: {
              select: {
                id: true,
                username: true,
                avatar: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (result === null) {
      throw new NotFound('id');
    }

    const post = { ...result.post, images: result.post.postImages.map(({ link }) => link) };

    return { ...result, post };
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
        package: true,
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

    const deliveryTime = getDeliveryDate(order.package.durationType, order.package.deliveryTime);

    const result = await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status: 'Accepted',
        deliveryTime,
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
