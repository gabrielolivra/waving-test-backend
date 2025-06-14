import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entity/payment.entity';
import { Repository } from 'typeorm';
import { CartStatus, OrderEntity } from 'src/order/entity/order.entity';
import { ICurrentUser } from 'src/shared/decorators/current-user.decorator';
import { MakePaymentDto } from '../controllers/dto/payment.dto';
import { BadRequestException } from '@nestjs/common';

export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentEntity: Repository<PaymentEntity>,
    @InjectRepository(OrderEntity)
    private readonly orderEntity: Repository<OrderEntity>,
  ) {}

  async makePayment(data: MakePaymentDto, user: ICurrentUser) {
    const verifyOrder = await this.orderEntity.findOne({
      where: {
        id: data.order,
        user: { id: user.sub },
      },
    });

    if (!verifyOrder) throw new BadRequestException('ORDER_NOT_FOUND');

    if (data.amount < verifyOrder.total || data.amount > verifyOrder.total)
      throw new BadRequestException('PAYMENT_BELOW_THE_AMOUNT');

    if (data.amount == verifyOrder.total) {
      await this.orderEntity.update(verifyOrder.id, {
        total: 0,
        status: CartStatus.PAID,
      });

      return await this.paymentEntity.save({
        ...data,
        order: { id: data.order },
      });
    }
  }
}
