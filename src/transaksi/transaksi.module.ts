import { Module } from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { TransaksiController } from './transaksi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangDibeli } from 'src/barangDibeli/entities/barangDibeli.entity';
import { Transaksi } from './entities/transaksi.entity';
import { User } from 'src/user/entities/user.entity';
import { Barang } from 'src/barang/entities/barang.entity';
import { CartService } from 'src/cart/cart.service';
import { Cart } from 'src/cart/entities/cart.entity';
import { BarangService } from 'src/barang/barang.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaksi, BarangDibeli, User, Barang, Cart]),
  ],
  controllers: [TransaksiController],
  providers: [TransaksiService, CartService, BarangService],
})
export class TransaksiModule {}
