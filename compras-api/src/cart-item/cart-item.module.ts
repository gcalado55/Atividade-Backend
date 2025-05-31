import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { CartItemController } from './cart-item.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem])],
  controllers: [CartItemController],
  providers: [],
  exports: [TypeOrmModule],
})
export class CartItemModule {}