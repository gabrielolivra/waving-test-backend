import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}
