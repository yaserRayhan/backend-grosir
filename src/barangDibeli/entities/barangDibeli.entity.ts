import { Barang } from 'src/barang/entities/barang.entity';
import { Transaksi } from 'src/transaksi/entities/transaksi.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class BarangDibeli {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  jumlah: number;

  @Column({ default: 0 })
  hargaTotal: number;

  @Column({ default: 0 })
  diskon: number;

  @ManyToOne(() => Barang, (barang) => barang.id)
  barang: Barang;

  @ManyToOne(() => Transaksi, (transaksi) => transaksi.id)
  transaksi: Transaksi;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
