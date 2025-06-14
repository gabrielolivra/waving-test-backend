import { Module } from '@nestjs/common';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemRepository } from './entity/item.entity';


@Module({
  imports:[TypeOrmModule.forFeature([ItemRepository])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
