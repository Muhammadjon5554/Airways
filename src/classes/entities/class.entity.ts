import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Seat } from '../../seats/entities/seat.entity';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;          

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  priceMultiplier: number; 

  @OneToMany(() => Seat, seat => seat.seatClass)
  seats: Seat[];
}
