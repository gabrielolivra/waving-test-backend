import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from './entity/cart.entity';
import { CartController } from './controllers/cart.controller';
import { CartService } from './services/cart.service';
import { ItemEntity } from 'src/item/entity/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartEntity, ItemEntity])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
