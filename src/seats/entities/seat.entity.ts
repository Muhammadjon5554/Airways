import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Plane } from '../../planes/entities/plane.entity';
import { Class } from '../../classes/entities/class.entity';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Entity('seats')
export class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  seatNumber: string;

  @ManyToOne(() => Plane, plane => plane.seats)
  plane: Plane;

  @ManyToOne(() => Class, seatClass => seatClass.seats)
  seatClass: Class;
  
   @OneToMany(() => Ticket, ticket => ticket.seat)
  tickets: Ticket[];
}
