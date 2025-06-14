import { BaseEntity } from 'src/shared/helpers/base.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';

@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user: UsersEntity;

  @Column({ name: 'shipping_address' })
  shippingAddress: string;

  @Column({ name: 'total', type: 'numeric' })
  total: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];
}
