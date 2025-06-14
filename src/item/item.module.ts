import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entity/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
