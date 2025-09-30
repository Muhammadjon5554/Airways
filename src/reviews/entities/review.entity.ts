import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Flight } from '../../flights/entities/flight.entity';

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rating: number;

  @Column({ nullable: true })
  comment: string;

  @ManyToOne(() => User, user => user.reviews)
  user: User;

  @ManyToOne(() => Flight, flight => flight.id)
  flight: Flight;
}
