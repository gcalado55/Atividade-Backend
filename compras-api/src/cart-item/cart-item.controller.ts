import { Controller, Get, Param, Delete, NotFoundException } from '@nestjs/common';
import { CartItem } from './entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('cart-items')
export class CartItemController {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  @Get()
  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find({ relations: ['product', 'cart'] });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CartItem> {
    const item = await this.cartItemRepository.findOne({
      where: { id },
      relations: ['product', 'cart'],
    });
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }
    return item;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const item = await this.cartItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }
    await this.cartItemRepository.remove(item);
    return { message: 'Item removido com sucesso' };
  }
}