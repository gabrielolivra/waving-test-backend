import { ItemEntity } from "src/item/entity/item.entity";
import { BaseEntity } from "src/shared/helpers/base.entity";
import { UsersEntity } from "src/users/entity/users.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity({ name: 'cart' })
export class CartEntity extends BaseEntity {

  @ManyToOne(() => UsersEntity, user => user.cartItems)
  user: UsersEntity;

  @ManyToOne(() => ItemEntity, item => item.cartItems)
  product: ItemEntity;

  @Column({ name: 'quantity', type: 'numeric', nullable: false })
  quantity: number;

}