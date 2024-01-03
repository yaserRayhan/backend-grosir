import { Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { BarangService } from 'src/barang/barang.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private barangService: BarangService,
  ) {}
  async create(createCartDto: CreateCartDto, id) {
    const barang = await this.barangService.findOne(createCartDto['barangId']);
    createCartDto['total_harga'] = createCartDto['jumlah'] * barang['harga'];
    createCartDto['barang'] = createCartDto['barangId'];
    delete createCartDto['barangId'];
    const cart = this.cartRepository.create({
      ...createCartDto,
      user: id,
    });
    return await this.cartRepository.save(cart);
  }

  async findAll(id) {
    const cart = await this.cartRepository.findAndCount({
      where: { user: { id: id } },
      relations: ['barang'],
    });
    return {
      data: cart[0],
      count: cart[1],
    };
  }

  async findOne(id: number) {
    const cart = await this.cartRepository.findOne({
      where: { id: id },
      relations: ['barang', 'user'],
    });
    return cart;
  }

  async remove(id, userId) {
    const cart = await this.findOne(id);
    if (cart.user.id != userId) {
      return {
        status: 403,
        message: 'Forbidden',
      };
    }

    return await this.cartRepository.delete(id);
  }
}
