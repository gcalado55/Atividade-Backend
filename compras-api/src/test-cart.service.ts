import { DataSource } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';

async function test() {
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [Product, Cart, CartItem],
    synchronize: true,
  });

  await dataSource.initialize();

  const cartService = new CartService(
    dataSource.getRepository(Cart),
    dataSource.getRepository(CartItem),
  );

  // Criar carrinho
  const cart = await cartService.createCart();
  console.log('Cart created:', cart);

  // Para adicionar produto, você precisa de um produto existente no DB
  // Aqui, crie ou busque um produto de exemplo:
  const productRepository = dataSource.getRepository(Product);
  let product = await productRepository.findOneBy({ id: 1 });
  if (!product) {
    product = productRepository.create({ name: 'Produto Teste', description: 'Teste', price: 10 });
    await productRepository.save(product);
  }

  // Adicionar produto ao carrinho
  const updatedCart = await cartService.addProductToCart(cart.id, product, 2);
  console.log('Added product to cart:', updatedCart);

  // Finalizar compra
  const message = await cartService.finalizePurchase(cart.id);
  console.log(message);

  await dataSource.destroy();
}

test();
