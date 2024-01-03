import { BarangDibeli } from 'src/barangDibeli/entities/barangDibeli.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Transaksi {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_harga: number;

  @Column()
  total_item: number;

  @Column()
  total_diskon: number;

  @Column()
  total_bayar: number;

  @Column({
    type: 'enum',
    enum: ['menunggu pembayaran', 'diproses', 'selesai', 'dibatalkan'],
    default: 'menunggu pembayaran',
  })
  status: string;

  @Column('text')
  bukti_pembayaran: string;

  @Column()
  no_rekening_pembayar: string;

  @Column()
  nama_pembayar: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => BarangDibeli, (barangDibeli) => barangDibeli.transaksi)
  barangDibeli: BarangDibeli[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
