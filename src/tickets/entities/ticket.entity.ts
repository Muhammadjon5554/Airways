import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne,
    OneToOne,
    JoinColumn
  } from 'typeorm';
  import { Flight } from '../../flights/entities/flight.entity';
  import { User } from '../../users/entities/user.entity';
  import { Seat } from '../../seats/entities/seat.entity';
  import { Payment } from '../../payments/entities/payment.entity';
  
  @Entity()
  export class Ticket {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'decimal' })
    price: number;
  
    @Column({ default: 'BOOKED' })
    status: string;
  
    @ManyToOne(() => User, user => user.tickets)
    user: User;
  
    @ManyToOne(() => Flight, flight => flight.tickets)
    flight: Flight;
  
    @ManyToOne(() => Seat, seat => seat.tickets)
    seat: Seat;
  
    @OneToOne(() => Payment, payment => payment.ticket, { nullable: true })
    @JoinColumn()
    payment?: Payment;  
  }
  