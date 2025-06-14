import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { OrderEntity } from "../entity/order.entity";
import { CartEntity } from "src/cart/entity/cart.entity";
import { OrderItemEntity } from "../entity/order-item.entity";
import { ItemEntity } from "src/item/entity/item.entity";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { ICurrentUser } from "src/shared/decorators/current-user.decorator";

export class OrderService {
	constructor(
		@InjectRepository(OrderEntity)
		private readonly orderEntity: Repository<OrderEntity>,
		@InjectRepository(CartEntity)
		private readonly cartEntity: Repository<CartEntity>,
		@InjectRepository(OrderItemEntity)
		private readonly orderItemEntity: Repository<OrderItemEntity>,
		@InjectRepository(ItemEntity)
		private readonly itemEntity: Repository<ItemEntity>,
	) { }

	async createOrderFromCart(user: ICurrentUser): Promise<OrderEntity> {
		const verifyCart = await this.cartEntity.find({
			where: { user: { id: user.sub } },
			relations: {
				item: true,
				user: true,
			}
		})

		if (verifyCart.length === 0) {
			throw new BadRequestException('CART_IS_EMPTY')
		}

		const order = this.orderEntity.create({
			user: { id: user.sub },
			total: verifyCart.reduce((acc, item) => {
				return acc + item.item.price * item.quantity;
			}, 0),
			status: 'pending',
			shippingAddress: 'testinho'
		});

		await this.orderEntity.save(order)

		for (const cartItem of verifyCart) {
			const product = cartItem.item

			if (product.stockQuantity < cartItem.quantity) {
				throw new BadRequestException(`Insufficient stock for product: ${product.name}`);
			}

			const orderItem = this.orderItemEntity.create({
				order: order,
				item: product,
				quantity: cartItem.quantity,
				price: product.price,
			});

			await this.orderItemEntity.save(orderItem)

		}

		for (const item of verifyCart) {
			const verifyItem = await this.itemEntity.findOne({
				where: {
					id: item.item.id
				}
			})

			console.log('item', item)

			if (verifyItem) {
				console.log('veio aqui', verifyItem)
				await this.itemEntity.update(verifyItem.id, {
					stockQuantity: verifyItem.stockQuantity - item.quantity
				})
			}
		}

		await this.cartEntity.remove(verifyCart)

		return order
	}
}