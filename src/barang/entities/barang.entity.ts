import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Barang {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  gambar: string;

  @Column({ length: 255 })
  nama_barang: string;

  @Column({ default: 0 })
  stok: number;

  @Column()
  ukuran: string;

  @Column({ default: 0 })
  harga: number;

  @Column({ default: 0 })
  diskon: number;

  @Column({ default: 0 })
  minimal_diskon: number;

  @Column()
  deskripsi: string;

  @Column({ default: 0 })
  total_dibeli: number;

  //colom kategori using enum
  @Column({
    type: 'enum',
    enum: ['pakaian', 'celana', 'sepatu'],
    default: 'pakaian',
  })
  kategori: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
