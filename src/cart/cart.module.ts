import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from 'src/barang/entities/barang.entity';
import { Cart } from './entities/cart.entity';
import { BarangService } from 'src/barang/barang.service';

@Module({
  imports: [TypeOrmModule.forFeature([Barang, Cart])],
  controllers: [CartController],
  providers: [CartService, BarangService],
})
export class CartModule {}
