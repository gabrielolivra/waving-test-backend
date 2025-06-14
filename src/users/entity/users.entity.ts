import { Role } from 'src/auth/role.enum';
import { CartEntity } from 'src/cart/entity/cart.entity';
import { OrderEntity } from 'src/order/entity/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @CreateDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @Column({
    name: 'role',
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @OneToMany(() => OrderEntity, (order) => order.user)
  orders: OrderEntity[];

  @OneToMany(() => CartEntity, (cartItem) => cartItem.user)
  cartItems: CartEntity[];
}
