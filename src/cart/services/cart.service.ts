import { Repository } from "typeorm";
import { CartEntity } from "../entity/cart.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ICurrentUser } from "src/shared/decorators/current-user.decorator";
import { ItemEntity } from "src/item/entity/item.entity";
import { BadRequestException } from "@nestjs/common";
import { CreateCartDto, UpdateCartDto } from "../controllers/dto/cart.dto";

export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartEntity: Repository<CartEntity>,
    @InjectRepository(ItemEntity)
    private itemEntity: Repository<ItemEntity>
  ) { }


  async listCart(user: ICurrentUser): Promise<CartEntity[]> {
    const findCart = await this.cartEntity.find({
      where: { user: { id: user.sub } },
      relations: {
        product:true
      }

    })

    return findCart
  }

  async cartAdd(user: ICurrentUser, cart: CreateCartDto) {

    const verifyProduct = await this.itemEntity.findOne({
      where: { id: cart.productId },
      relations: {
        cartItems: true
      }
    })

    const verifyProductInCart = await this.cartEntity.findOne({
      relations: {user: true},
      where: {
        product: {id: verifyProduct?.id},
        user: {id: user.sub}
      }
    })

    if (!verifyProduct) {
      throw new BadRequestException('PRODUCT_NOT_FOUND')
    }

    if(verifyProductInCart){
      throw new BadRequestException('PRODUCT_IS_ADD_IN_CART')
    }

    if (cart.quantity > verifyProduct.stockQuantity) {
      throw new BadRequestException('PRODUCT_OUT_OF_STOCK')
    }

    const payload = {
      user: { id: user.sub },
      product: verifyProduct,
      quantity: cart.quantity
    }
    const data =  this.cartEntity.create(payload)

    return await this.cartEntity.save(data)
  }

  async updateCart(user: ICurrentUser,id:string, cartData: UpdateCartDto) {
    const verifyCart = await this.cartEntity.findOne({
      where: {
        id:id,
        user: { id: user.sub }
      }
    })

    if (!verifyCart) {
      throw new BadRequestException('PRODUCT_NOT_FOUND')
    }

    await this.cartEntity.update(id, { quantity: cartData.quantity })
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