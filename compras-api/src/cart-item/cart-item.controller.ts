import { Controller, Get, Param, Delete, NotFoundException } from '@nestjs/common';
import { CartItem } from './entities/cart-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Cart Items')
@Controller('cart-items')
export class CartItemController {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os itens do carrinho' })
  @ApiResponse({ status: 200, description: 'Lista retornada com sucesso' })
  async findAll(): Promise<CartItem[]> {
    return this.cartItemRepository.find({ relations: ['product', 'cart'] });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um item do carrinho pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do item do carrinho' })
  @ApiResponse({ status: 200, description: 'Item encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
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
  @ApiOperation({ summary: 'Remover um item do carrinho pelo ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID do item do carrinho' })
  @ApiResponse({ status: 200, description: 'Item removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  async remove(@Param('id') id: number) {
    const item = await this.cartItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException('Cart item not found');
    }
    await this.cartItemRepository.remove(item);
    return { message: 'Item removido com sucesso' };
  }
}
