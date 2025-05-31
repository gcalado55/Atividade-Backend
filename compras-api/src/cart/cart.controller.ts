import { Controller, Post, Param, Body, Delete, Get, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { AddProductDto } from './dto/add-product.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createCart() {
    // Cria um novo carrinho vazio
    return this.cartService.createCart();
  }

  @Post(':cartId/add/:productId')
  async addProduct(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
    @Body() body: AddProductDto,
  ) {
    // Busca o produto pelo id
    const product = await this.productService.findOne(productId);
    
    // Se não existir, lança NotFoundException com mensagem clara
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }

    // Se produto existe, adiciona ao carrinho via service
    return this.cartService.addProductToCart(cartId, product, body.quantity);
  }

  @Delete(':cartId/remove/:productId')
  async removeProduct(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    // Remove produto do carrinho, lança erro se produto não estiver presente
    return this.cartService.removeProductFromCart(cartId, productId);
  }

  @Post(':cartId/finalize')
  async finalize(@Param('cartId') cartId: number) {
    // Finaliza compra (limpa carrinho)
    return this.cartService.finalizePurchase(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllCarts() {
    // Lista todos os carrinhos com seus itens e produtos
    return this.cartService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':cartId')
  async findCartById(@Param('cartId') cartId: number) {
    // Busca um carrinho específico pelo id
    return this.cartService.getCart(cartId);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete(':cartId')
  async deleteCart(@Param('cartId') cartId: number) {
    // Deleta um carrinho específico pelo id
    await this.cartService.deleteCart(cartId);
    return { message: `Carrinho ${cartId} deletado com sucesso` };
  }
}
