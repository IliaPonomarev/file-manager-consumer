import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ type: 'date' })
  purchaseDate: Date;
}