import { DataSource } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';

async function test() {
  // Inicializa o DataSource do TypeORM com SQLite e as entidades necessárias
  const dataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [Product, Cart, CartItem],
    synchronize: true, // Cria as tabelas automaticamente no DB
  });

  await dataSource.initialize();

  // Mock simples do ProductService com método findOne (não será usado aqui, mas necessário para injeção)
  const mockProductService = {
    findOne: async (id: number) => null, // Retorna null para simplificar
  };

  // Instancia o CartService passando os repositórios e o mock do ProductService
  const cartService = new CartService(
    dataSource.getRepository(Cart),
    dataSource.getRepository(CartItem),
    mockProductService as any, // 'any' para ignorar tipagem exata no teste
  );

  // Mock de um usuário para passar para o createCart, já que o método espera um User
  const mockUser = {
    id: 1,
    name: 'Usuário Teste',
    email: 'teste@email.com',
    password: 'senha_hash',
    carts: [],
  };

  // Cria um carrinho para o usuário mockado
  const cart = await cartService.createCart(mockUser as any);
  console.log('Cart created:', cart);

  // Obtém o repositório de produtos para criar ou buscar um produto de exemplo
  const productRepository = dataSource.getRepository(Product);
  let product = await productRepository.findOneBy({ id: 1 });

  // Se não existir produto com id 1, cria um produto de teste e salva
  if (!product) {
    product = productRepository.create({
      name: 'Produto Teste',
      description: 'Teste',
      price: 10,
    });
    await productRepository.save(product);
  }

  // Adiciona o produto criado/buscado ao carrinho com quantidade 2
  const updatedCart = await cartService.addProductToCart(cart.id, product, 2);
  console.log('Added product to cart:', updatedCart);

  // Finaliza a compra do carrinho (limpa o carrinho)
  const message = await cartService.finalizePurchase(cart.id);
  console.log(message);

  // Fecha a conexão com o banco
  await dataSource.destroy();
}

test();
