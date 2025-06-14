import { BaseEntity } from 'src/shared/helpers/base.entity';
import { UsersEntity } from 'src/users/entity/users.entity';
import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { OrderItemEntity } from './order-item.entity';
import { PaymentEntity } from 'src/payment/entity/payment.entity';
export enum CartStatus {
  PENDING = 'pending',
  PAID = 'paid',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
@Entity({ name: 'order' })
export class OrderEntity extends BaseEntity {
  @Column({ name: 'shipping_address' })
  shippingAddress: string;

  @Column({ name: 'total', type: 'numeric' })
  total: number;

  @Column({
    type: 'enum',
    enum: CartStatus,
    default: CartStatus.PENDING,
  })
  status: CartStatus;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @OneToOne(() => PaymentEntity, (payment) => payment.order)
  payment: PaymentEntity;

  @ManyToOne(() => UsersEntity, (user) => user.orders)
  user: UsersEntity;
}
