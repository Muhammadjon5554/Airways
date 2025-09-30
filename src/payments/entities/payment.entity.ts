import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  method: string;

  @Column({ default: 'PENDING' })
  status: string;

  @ManyToOne(() => Ticket, ticket => ticket.payment)
  ticket: Ticket;
}

