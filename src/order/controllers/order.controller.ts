import { Controller, Injectable, Post, UseGuards } from "@nestjs/common";
import { OrderService } from "../services/order.service";
import { CurrentUser, ICurrentUser } from "src/shared/decorators/current-user.decorator";
import { Roles } from "src/shared/decorators/roles.decorator";
import { Role } from "src/auth/role.enum";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";


@Controller('order')
@Injectable()
export class OrderController {
  constructor(
    private readonly orderService: OrderService
  ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('')
  async createOrder(
    @CurrentUser() user: ICurrentUser
  ) {
    return await this.orderService.createOrderFromCart(user)
  }
}