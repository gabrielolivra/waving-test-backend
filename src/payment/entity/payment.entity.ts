import { OrderEntity } from "src/order/entity/order.entity";
import { BaseEntity } from "src/shared/helpers/base.entity";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PIX = 'pix',
  BOLETO = 'boleto',
}

@Entity('payment')
export class PaymentEntity extends BaseEntity {

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    nullable:false
  })
  paymentMethod: PaymentMethod;


  @Column({ name: 'amount', type: 'numeric', nullable:false })

  @OneToOne(() => OrderEntity, order => order.payment)
  @JoinColumn()
  order: OrderEntity;

  amount: number;

}