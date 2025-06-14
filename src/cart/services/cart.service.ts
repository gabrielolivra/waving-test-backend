import { Repository } from "typeorm";
import { CartEntity } from "../entity/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ICurrentUser } from "src/shared/decorators/current-user.decorator";
import { ItemEntity } from "src/item/entity/item.entity";
import { BadRequestException } from "@nestjs/common";

export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartEntity: Repository<CartEntity>,
    @InjectRepository(ItemEntity)
    private itemEntity: Repository<ItemEntity>
  ) { }


  async listCart(user: ICurrentUser): Promise<CartEntity[]> {
    const findCart = await this.cartEntity.find({
      where: { user: { id: user.sub } }
    })
    return findCart
  }

  async cartAdd(user: ICurrentUser, cart: any) {

    const verifyProduct = await this.itemEntity.findOne({
      where: { id: cart.productId }
    })

    if (!verifyProduct) {
      throw new BadRequestException('PRODUCT_NOT_FOUND')
    }

    if (cart.quantity > verifyProduct.stockQuantity) {
      throw new BadRequestException('PRODUCT_OUT_OF_STOCK')
    }

    const payload = {
      user: user,
      ...cart
    }

    return await this.cartEntity.save(payload)
  }

  async updateCart(user: ICurrentUser, cartData: any) {
    const verifyCart = await this.cartEntity.findOne({
      where: {
        id: cartData.id,
        user: { id: user.sub }
      }
    })

    if (!verifyCart) {
      throw new BadRequestException('PRODUCT_NOT_FOUND')
    }

    await this.cartEntity.update(cartData.id, { quantity: cartData.quantity })
  }

  async removeItem(user: ICurrentUser, id: string) {
    const verifyItem = await this.cartEntity.findOne({
      where: { id, user: { id: user.sub } }
    })

    if (!verifyItem) {
      throw new BadRequestException('ITEM_NOT_FOUND')
    }

    await this.cartEntity.remove(verifyItem)
  }
}