import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'item' })
export class ItemRepository {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string

    @Column({ name: 'description', nullable: false })
    description:string

    @Column({ name: 'price', type: 'numeric', nullable: false })
    price: number

    @Column({ name: 'image', nullable: false, default:'https://placehold.co/400' })
    image: string

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at', nullable: true })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at', nullable: true })
    deletedAt: Date;

}