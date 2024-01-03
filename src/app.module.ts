import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BarangModule } from './barang/barang.module';
import { CartModule } from './cart/cart.module';
import { TransaksiModule } from './transaksi/transaksi.module';
import { BarangDibeliModule } from './barangDibeli/barangDibeli.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8889,
      username: 'root',
      password: 'root',
      database: 'grosir',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    BarangModule,
    CartModule,
    TransaksiModule,
    BarangDibeliModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
