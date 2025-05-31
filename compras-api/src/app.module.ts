import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/entities/cart.entity'; 
import { CartItem } from './cart-item/entities/cart-item.entity';
import { CartItemModule } from './cart-item/cart-item.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ProductModule,
    CartModule,
    CartItemModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
