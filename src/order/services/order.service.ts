import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CartStatus, OrderEntity } from '../entity/order.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { OrderItemEntity } from '../entity/order-item.entity';
import { ItemEntity } from 'src/item/entity/item.entity';
import { BadRequestException } from '@nestjs/common';
import { ICurrentUser } from 'src/shared/decorators/current-user.decorator';
import { CreateOrderDto } from '../controllers/dto/order.dto';

export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
    @InjectRepository(CartEntity)
    private readonly cartEntity: Repository<CartEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly orderItemEntity: Repository<OrderItemEntity>,
    @InjectRepository(ItemEntity)
    private readonly itemEntity: Repository<ItemEntity>,
    private readonly dataSource:DataSource
  ) { }

    async createOrderFromCart(
    user: ICurrentUser,
    data: CreateOrderDto,
  ): Promise<OrderEntity> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const cartRepository = queryRunner.manager.getRepository(CartEntity);
      const orderRepository = queryRunner.manager.getRepository(OrderEntity);
      const orderItemRepository = queryRunner.manager.getRepository(OrderItemEntity);
      const itemRepository = queryRunner.manager.getRepository(ItemEntity);

      const verifyCart = await cartRepository.find({
        where: { user: { id: user.sub } },
        relations: { item: true, user: true },
      });

      if (verifyCart.length === 0) {
        throw new BadRequestException('CART_IS_EMPTY');
      }

      const total = verifyCart.reduce((acc, item) => {
        return acc + item.item.price * item.quantity;
      }, 0);

      const order = orderRepository.create({
        user: { id: user.sub },
        total,
        status: CartStatus.PENDING,
        shippingAddress: data.shippingAddress,
      });

      await orderRepository.save(order);

      for (const cartItem of verifyCart) {
        const product = cartItem.item;

        if (product.stockQuantity < cartItem.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product: ${product.name}`,
          );
        }

        const orderItem = orderItemRepository.create({
          order,
          item: product,
          quantity: cartItem.quantity,
          price: product.price,
        });

        await orderItemRepository.save(orderItem);
      }

      for (const item of verifyCart) {
        const verifyItem = await itemRepository.findOne({
          where: { id: item.item.id },
        });

        if (verifyItem) {
          verifyItem.stockQuantity -= item.quantity;
          await itemRepository.save(verifyItem);
        }
      }

      await cartRepository.remove(verifyCart);

      await queryRunner.commitTransaction();

      return order;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }


  async myOrders(user: ICurrentUser): Promise<OrderEntity[]> {
    const myOrders = await this.orderEntity.find({
      where: {
        user: {
          id: user.sub,
        },
      },
    });

    return myOrders;
  }
}
