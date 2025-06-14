import { Body, Controller, Injectable, Post, UseGuards } from '@nestjs/common';
import {
  CurrentUser,
  ICurrentUser,
} from 'src/shared/decorators/current-user.decorator';
import { MakePaymentDto } from './dto/payment.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { PaymentService } from '../services/payment.service';

@Controller('payment')
@Injectable()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('')
  async makePayment(
    @CurrentUser() user: ICurrentUser,
    @Body() data: MakePaymentDto,
  ) {
    return await this.paymentService.makePayment(data, user);
  }
}
