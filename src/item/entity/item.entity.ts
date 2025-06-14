import { CartEntity } from "src/cart/entity/cart.entity";
import { OrderItemEntity } from "src/order/entity/order-item.entity";
import { BaseEntity } from "src/shared/helpers/base.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'item' })
export class ItemEntity extends BaseEntity {

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'price', type: 'numeric', nullable: false })
  price: number;

  @Column({ name: 'image_url', nullable: false, default: 'https://placehold.co/400' })
  imageUrl: string;

  @Column({ name: 'stock_quantity', nullable: false, type: 'numeric' })
  stockQuantity: number;

  @OneToMany(() => CartEntity, cartItem => cartItem.product)
  cartItems: CartEntity[];


  @OneToMany(() => OrderItemEntity, orderItem => orderItem.item)
  orderItems: OrderItemEntity[];

}