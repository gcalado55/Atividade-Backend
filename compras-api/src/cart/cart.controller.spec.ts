import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { ProductService } from '../product/product.service';

describe('CartController', () => {
  let controller: CartController;
  let cartService: CartService;

  const mockCartService = {
    createCart: jest.fn(),
    addProductToCart: jest.fn(),
    removeProductFromCart: jest.fn(),
    finalizePurchase: jest.fn(),
    findAll: jest.fn(),
    getCart: jest.fn(),
    deleteCart: jest.fn(),
  };

  const mockProductService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartController],
      providers: [
        {
          provide: CartService,
          useValue: mockCartService,
        },
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<CartController>(CartController);
    cartService = module.get<CartService>(CartService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createCart', () => {
    it('should call createCart from service', async () => {
      const mockCart = { id: 1 };
      mockCartService.createCart.mockResolvedValue(mockCart);

      const result = await controller.createCart();

      expect(mockCartService.createCart).toHaveBeenCalled();
      expect(result).toEqual(mockCart);
    });
  });

  // Você pode criar testes para addProduct, removeProduct, finalize, findAllCarts etc.
});
