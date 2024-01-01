import { Module } from '@nestjs/common';
import { BarangService } from './barang.service';
import { BarangController } from './barang.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './entities/barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barang])],
  controllers: [BarangController],
  providers: [BarangService],
})
export class BarangModule {}
