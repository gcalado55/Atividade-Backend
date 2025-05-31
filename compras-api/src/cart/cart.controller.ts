import { Controller, Post, Param, Body, Delete, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { NotFoundException } from '@nestjs/common';
import { AddProductDto } from './dto/add-product.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async createCart() {
    return this.cartService.createCart();
  }

  @Post(':cartId/add/:productId')
  async addProduct(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
    @Body() body: AddProductDto,
  ) {
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.cartService.addProductToCart(cartId, product, body.quantity);
  }

  @Delete(':cartId/remove/:productId')
  async removeProduct(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeProductFromCart(cartId, productId);
  }

  @Post(':cartId/finalize')
  async finalize(@Param('cartId') cartId: number) {
    return this.cartService.finalizePurchase(cartId);
  }

  // Novo endpoint para listar todos os carrinhos com itens e produtos
  @Get()
  async findAllCarts() {
    return this.cartService.findAll();
  }

  // Opcional: listar um carrinho específico com itens e produtos
  @Get(':cartId')
  async findCartById(@Param('cartId') cartId: number) {
    return this.cartService.getCart(cartId);
  }
  
   @Delete(':cartId')
  async deleteCart(@Param('cartId') cartId: number) {
    await this.cartService.deleteCart(cartId);
    return { message: `Carrinho ${cartId} deletado com sucesso` };
  }
}
