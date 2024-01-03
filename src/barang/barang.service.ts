import { Injectable } from '@nestjs/common';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Barang } from './entities/barang.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class BarangService {
  constructor(
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
  ) {}
  async create(createBarangDto: CreateBarangDto) {
    const barang = this.barangRepository.create(createBarangDto);
    return await this.barangRepository.save(barang);
  }

  async findAll(query) {
    let where;
    if (query.kategori) {
      where = {
        kategori: query.kategori,
      };
    }
    if (query.search) {
      where = {
        ...where,
        nama_barang: Like(`%${query.search}%`),
      };
    }
    let order;
    if (query.order) {
      const queryOrder = query.order.split(':');
      order = {
        [queryOrder[0]]: queryOrder[1],
      };
    }
    const take = parseInt(query.pageSize ? query.pageSize : 10);
    const skip = ((query.page ? query.page : 1) - 1) * take;
    const barang = await this.barangRepository.findAndCount({
      take: take,
      skip: skip,
      where: where,
      order: order,
    });

    return {
      statusCode: 200,
      data: barang[0] ? barang[0] : [],
      pagination: {
        page: parseInt(query.page ? query.page : 1),
        pageSize: parseInt(query.pageSize ? query.pageSize : 10),
        total: barang[1],
        totalPage: Math.ceil(barang[1] / take),
      },
    };
  }

  async findOne(id: number) {
    const barang = await this.barangRepository.findOne({ where: { id: id } });
    return barang;
  }

  update(id: number, updateBarangDto: UpdateBarangDto) {
    const barang = this.barangRepository.create(updateBarangDto);
    return this.barangRepository.update(id, barang);
  }

  remove(id: number) {
    const barang = this.barangRepository.delete(id);
    return barang;
  }
}
