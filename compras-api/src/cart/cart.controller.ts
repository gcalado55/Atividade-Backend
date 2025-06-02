import { Controller, Post, Param, Body, Delete, Get, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';
import { AddProductDto } from './dto/add-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly productService: ProductService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({ summary: 'Criar um novo carrinho para o usuário autenticado' })
  @ApiResponse({ status: 201, description: 'Carrinho criado com sucesso.' })
  createCart(@Request() req) {
    return this.cartService.createCart(req.user);
  }

  @Post(':cartId/add/:productId')
  @ApiOperation({ summary: 'Adicionar um produto ao carrinho' })
  @ApiResponse({ status: 200, description: 'Produto adicionado ao carrinho com sucesso.' })
  async addProduct(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
    @Body() body: AddProductDto,
  ) {
    const product = await this.productService.findOne(productId);
    if (!product) {
      throw new NotFoundException(`Produto com ID ${productId} não encontrado`);
    }
    return this.cartService.addProductToCart(cartId, product, body.quantity);
  }

  @Delete(':cartId/remove/:productId')
  @ApiOperation({ summary: 'Remover um produto do carrinho' })
  @ApiResponse({ status: 200, description: 'Produto removido do carrinho com sucesso.' })
  removeProduct(
    @Param('cartId') cartId: number,
    @Param('productId') productId: number,
  ) {
    return this.cartService.removeProductFromCart(cartId, productId);
  }

  @Post(':cartId/finalize')
  @ApiOperation({ summary: 'Finalizar a compra do carrinho' })
  @ApiResponse({ status: 200, description: 'Compra finalizada e carrinho limpo.' })
  finalize(@Param('cartId') cartId: number) {
    return this.cartService.finalizePurchase(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({ summary: 'Listar todos os carrinhos' })
  @ApiResponse({ status: 200, description: 'Lista de carrinhos retornada com sucesso.' })
  findAllCarts() {
    return this.cartService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':cartId')
  @ApiOperation({ summary: 'Buscar um carrinho pelo ID' })
  @ApiResponse({ status: 200, description: 'Carrinho retornado com sucesso.' })
  findCartById(@Param('cartId') cartId: number) {
    return this.cartService.getCart(cartId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':cartId')
  @ApiOperation({ summary: 'Deletar um carrinho pelo ID' })
  @ApiResponse({ status: 200, description: 'Carrinho deletado com sucesso.' })
  async deleteCart(@Param('cartId') cartId: number) {
    await this.cartService.deleteCart(cartId);
    return { message: `Carrinho ${cartId} deletado com sucesso` };
  }
}
