import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, UseGuards } from "@nestjs/common";
import { CartService } from "../services/cart.service";
import { CurrentUser, ICurrentUser } from "src/shared/decorators/current-user.decorator";
import { CreateCartDto, UpdateCartDto } from "./dto/cart.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/shared/decorators/roles.decorator";
import { Role } from "src/auth/role.enum";

@Controller('cart')
@Injectable()
export class CartController {
  constructor(
    private readonly cartService: CartService
  ) { }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('')
  async listCart(
    @CurrentUser() user: ICurrentUser
  ) {
    return await this.cartService.listCart(user)
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('')
  async cartAdd(
    @CurrentUser() user: ICurrentUser,
    @Body() createCartDto: CreateCartDto
  ) {
    return await this.cartService.cartAdd(user, createCartDto)
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Put('/:id')
  async updateCart(
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string,
    @Body() updateCartDto: UpdateCartDto
  ) {
    return await this.cartService.updateCart(user, id, updateCartDto)
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  async removeCart(
    @CurrentUser() user: ICurrentUser,
    @Param('id') id: string
  ) {
    return await this.cartService.removeItem(user, id)
  }
}