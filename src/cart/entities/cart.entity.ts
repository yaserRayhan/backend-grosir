import { Barang } from 'src/barang/entities/barang.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Barang, (barang) => barang.id)
  barang: Barang;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  jumlah: number;

  @Column()
  total_harga: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
