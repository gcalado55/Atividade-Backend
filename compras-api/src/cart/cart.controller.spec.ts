import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';

describe('CartController', () => {
  let controller: CartController;
  let cartService: jest.Mocked<CartService>;
  let productService: jest.Mocked<ProductService>;

  const mockCartService: Partial<jest.Mocked<CartService>> = {
    createCart: jest.fn(),
    addProductToCart: jest.fn(),
    removeProductFromCart: jest.fn(),
    finalizePurchase: jest.fn(),
    findAll: jest.fn(),
    getCart: jest.fn(),
    deleteCart: jest.fn(),
  };

  const mockProductService: Partial<jest.Mocked<ProductService>> = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        { provide: CartService, useValue: mockCartService },
        { provide: ProductService, useValue: mockProductService },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get(CartService);
    productService = module.get(ProductService);

    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCart', () => {
    it('should call createCart from service', async () => {
      const mockUser = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        password: 'hashedPassword',
        carts: [],
      };

      const mockCart = {
        id: 1,
        items: [],
        user: mockUser,
      };

      const mockReq = { user: mockUser };

      cartService.createCart!.mockResolvedValue(mockCart);

      const result = await controller.createCart(mockReq);

      expect(cartService.createCart).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockCart);
    });
  });
});
