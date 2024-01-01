import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'text', nullable: true })
  profile: string;

  @Column('text')
  alamat: string;

  @Column()
  jenis_kelamin: string;

  @Column()
  no_hp: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user', 'kasir'],
    default: 'user',
  })
  level: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
