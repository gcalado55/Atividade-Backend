import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cart-item/entities/cart-item.entity';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service'; 
import { User } from '../user/entities/user.entity';
import { DeepPartial } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,

    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

    private readonly productService: ProductService,
  ) {}

  async getCart(cartId: number): Promise<Cart> {
    const cart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: ['items', 'items.product'],
    });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }
    return cart;
  }

  async createCart(user: User): Promise<Cart> {
  const cartData: DeepPartial<Cart> = {
    items: [],
    user: user,
  };
  const cart = this.cartRepository.create(cartData);
  return this.cartRepository.save(cart);
}

  async addProductToCart(cartId: number, product: Product, quantity: number): Promise<Cart> {
    const existingProduct = await this.productService.findOne(product.id);
    if (!existingProduct) {
      throw new NotFoundException(`Produto com ID ${product.id} não encontrado no service`);
    }

    const cart = await this.getCart(cartId);

    let item = cart.items.find(i => i.product.id === product.id);

    if (item) {
      item.quantity += quantity;
      await this.cartItemRepository.save(item);
    } else {
      item = this.cartItemRepository.create({ product, quantity, cart });
      await this.cartItemRepository.save(item);
      cart.items.push(item);
    }

    return this.cartRepository.save(cart);
  }

  async removeProductFromCart(cartId: number, productId: number): Promise<Cart> {
    const cart = await this.getCart(cartId);

    const item = cart.items.find(i => i.product.id === productId);
    if (!item) {
      throw new NotFoundException('Product not in cart');
    }

    await this.cartItemRepository.remove(item);
    cart.items = cart.items.filter(i => i.product.id !== productId);

    return this.cartRepository.save(cart);
  }

  async clearCart(cartId: number): Promise<void> {
    const cart = await this.getCart(cartId);

    await this.cartItemRepository.remove(cart.items);
    cart.items = [];
    await this.cartRepository.save(cart);
  }

  async finalizePurchase(cartId: number): Promise<string> {
    await this.clearCart(cartId);
    return 'Purchase finalized successfully';
  }

  async findAll(): Promise<Cart[]> {
    return this.cartRepository.find({ relations: ['items', 'items.product'] });
  }

  async deleteCart(cartId: number): Promise<void> {
    const cart = await this.getCart(cartId);
    await this.cartRepository.remove(cart);
  }
}
