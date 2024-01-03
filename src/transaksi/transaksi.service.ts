import { Injectable } from '@nestjs/common';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaksi } from './entities/transaksi.entity';
import { BarangDibeli } from 'src/barangDibeli/entities/barangDibeli.entity';
import { CartService } from 'src/cart/cart.service';
import { BarangService } from 'src/barang/barang.service';

@Injectable()
export class TransaksiService {
  constructor(
    @InjectRepository(Transaksi)
    private transaksiRepository: Repository<Transaksi>,
    @InjectRepository(BarangDibeli)
    private barangDibeliRepository: Repository<BarangDibeli>,
    private cartService: CartService,
    private barangService: BarangService,
  ) {}

  findAll() {
    const transaksi = this.transaksiRepository.find({
      relations: ['user', 'barangDibeli', 'barangDibeli.barang'],
      order: { id: 'DESC' },
    });
    return transaksi;
  }

  async createPembelian(id: number, ctd: CreateTransaksiDto) {
    const transaksi = await this.cartService.findAll(id);

    let totalHarga = 0;
    let totalDiskon = 0;

    transaksi.data.forEach((trk) => {
      totalHarga += trk.total_harga;
      if (trk.barang.minimal_diskon <= trk.jumlah) {
        totalDiskon += trk.barang.diskon;
      }
    });

    const createTransaksiDto: CreateTransaksiDto = {
      total_harga: totalHarga,
      total_item: transaksi.count,
      total_diskon: totalDiskon,
      total_bayar: totalHarga - totalDiskon,
      status: 'diproses',
      bukti_pembayaran: ctd.bukti_pembayaran,
      no_rekening_pembayar: ctd.no_rekening_pembayar,
      nama_pembayar: ctd.nama_pembayar,
      user: { id: id },
    };

    let newTransaksi = this.transaksiRepository.create(createTransaksiDto);
    newTransaksi = await this.transaksiRepository.save(newTransaksi);

    transaksi.data.forEach(async (trk) => {
      const barangDibeli = {
        jumlah: trk.jumlah,
        hargaTotal: trk.total_harga,
        diskon: trk.barang.diskon,
        transaksi: newTransaksi,
        barang: trk.barang,
      };
      await this.barangDibeliRepository.save(barangDibeli);
      await this.cartService.remove(trk.id, id);

      //update stok barang
      trk.barang.stok -= trk.jumlah;
      await this.barangService.update(trk.barang.id, trk.barang);
    });
    const transaksiBaru = await this.findOne(newTransaksi.id);
    return {
      total_harga: totalHarga,
      total_diskon: totalDiskon,
      total_bayar: totalHarga - totalDiskon,
      transaksi: transaksiBaru,
    };
  }

  findOne(id: number) {
    const transaksi = this.transaksiRepository.findOne({
      where: { id: id },
      relations: ['user', 'barangDibeli', 'barangDibeli.barang'],
    });

    return transaksi;
  }

  update(id: number, updateTransaksiDto: UpdateTransaksiDto) {
    const transaksi = this.transaksiRepository.update(
      { id: id },
      updateTransaksiDto,
    );
    return transaksi;
  }

  remove(id: number) {
    return `This action removes a #${id} transaksi`;
  }

  async findMy(id: number) {
    const transaksi = await this.transaksiRepository.find({
      where: { user: { id: id } },
      relations: ['user', 'barangDibeli', 'barangDibeli.barang'],
    });
    return transaksi;
  }
}
