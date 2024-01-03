import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangDibeli } from './entities/barangDibeli.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarangDibeli])],
  controllers: [],
  providers: [],
})
export class BarangDibeliModule {}
