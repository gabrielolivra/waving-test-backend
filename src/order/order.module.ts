import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItemEntity } from './entity/order-item.entity';
import { OrderEntity } from './entity/order.entity';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { ItemEntity } from 'src/item/entity/item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderItemEntity,
      CartEntity,
      ItemEntity,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
