import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('loyalty')
export class Loyalty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.loyaltyRecords)
  user: User;

  @Column({ default: 'BRONZE' })
  level: string;

  @Column({ default: 0 })
  points: number;
}
