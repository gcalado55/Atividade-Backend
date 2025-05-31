import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { CartItem } from '../cart-item/entities/cart-item.entity';
import { ProductService } from '../product/product.service';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('CartService', () => {
  let service: CartService;
  let cartRepo: Repository<Cart>;
  let cartItemRepo: Repository<CartItem>;
  let productService: ProductService;

  // Mocks
  const mockCartRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    remove: jest.fn(),
  };

  const mockCartItemRepository = {
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  const mockProductService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CartService,
        {
          provide: getRepositoryToken(Cart),
          useValue: mockCartRepository,
        },
        {
          provide: getRepositoryToken(CartItem),
          useValue: mockCartItemRepository,
        },
        {
          provide: ProductService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepo = module.get<Repository<Cart>>(getRepositoryToken(Cart));
    cartItemRepo = module.get<Repository<CartItem>>(getRepositoryToken(CartItem));
    productService = module.get<ProductService>(ProductService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCart', () => {
    it('should create and save a new cart', async () => {
      const mockCart = { id: 1, items: [] };
      mockCartRepository.create.mockReturnValue(mockCart);
      mockCartRepository.save.mockResolvedValue(mockCart);
      mockProductService.findOne.mockResolvedValue(null);

      const result = await service.createCart({ id: 1 } as any);

      expect(mockCartRepository.create).toHaveBeenCalledWith({ items: [], user: { id: 1 } });
      expect(mockCartRepository.save).toHaveBeenCalledWith(mockCart);
      expect(result).toEqual(mockCart);
    });
  });

  describe('addProductToCart', () => {
    it('should throw NotFoundException if product does not exist', async () => {
      mockProductService.findOne.mockResolvedValue(null);

      await expect(
        service.addProductToCart(1, { id: 99 } as any, 1),
      ).rejects.toThrow(NotFoundException);
    });

    it('should add a new item if not exists', async () => {
      const product = { id: 1 } as any;
      const cart = { id: 1, items: [], user: { id: 1 } };
      const cartItem = { id: 1, product, quantity: 2, cart };

      mockProductService.findOne.mockResolvedValue(product);
      service.getCart = jest.fn().mockResolvedValue(cart);
      mockCartItemRepository.create.mockReturnValue(cartItem);
      mockCartItemRepository.save.mockResolvedValue(cartItem);
      mockCartRepository.save.mockResolvedValue({ ...cart, items: [cartItem] });

      const result = await service.addProductToCart(cart.id, product, 2);

      expect(service.getCart).toHaveBeenCalledWith(cart.id);
      expect(mockCartItemRepository.create).toHaveBeenCalledWith({ product, quantity: 2, cart });
      expect(mockCartItemRepository.save).toHaveBeenCalledWith(cartItem);
      expect(mockCartRepository.save).toHaveBeenCalled();
      expect(result.items.length).toBe(1);
    });
  });
});
