import { Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { CartItem } from '../../cart-item/entities/cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (item) => item.cart, { cascade: true, eager: true })
  items: CartItem[];
}
