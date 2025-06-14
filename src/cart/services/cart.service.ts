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
        item:true
      }

    })

    return findCart
  }

 async cartAdd(user: ICurrentUser, cart: CreateCartDto) {

  const product = await this.itemEntity.findOne({
    where: { id: cart.productId },
  });

  if (!product) {
    throw new BadRequestException('PRODUCT_NOT_FOUND');
  }

  const existingCartItem = await this.cartEntity.findOne({
    where: {
      item: { id: product.id },
      user: { id: user.sub }
    },
    relations:{
      item: true, user: true
    }, 
  });

  if (existingCartItem) {
    throw new BadRequestException('PRODUCT_IS_ALREADY_IN_CART');
  }

  if (cart.quantity > product.stockQuantity) {
    throw new BadRequestException('PRODUCT_OUT_OF_STOCK');
  }

  const cartItem = this.cartEntity.create({
    user: { id: user.sub },
    item: product,
    quantity: cart.quantity,
  });

  return await this.cartEntity.save(cartItem);
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