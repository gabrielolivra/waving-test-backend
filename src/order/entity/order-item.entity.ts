import { BaseEntity } from "src/shared/helpers/base.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { OrderEntity } from "./order.entity";
import { ItemEntity } from "src/item/entity/item.entity";

@Entity({name:'order_item'})
export class OrderItemEntity extends BaseEntity {

  @ManyToOne(() => OrderEntity, order => order.items)
  order: OrderEntity;

  @ManyToOne(() => ItemEntity, item => item.orderItems)
  item: ItemEntity;

  @Column({name:'quantity', type:'number'})
  quantity: number;

  @Column({name:'price', type:'numeric'})
  price: number;
}
