import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { User } from '../users/entities/user.entity';
import { Flight } from '../flights/entities/flight.entity';
import { Seat } from '../seats/entities/seat.entity';
import { Payment } from '../payments/entities/payment.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket) private readonly ticketRepo: Repository<Ticket>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Flight) private readonly flightRepo: Repository<Flight>,
    @InjectRepository(Seat) private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const flight = await this.flightRepo.findOne({ where: { id: dto.flightId } });
    if (!flight) throw new NotFoundException('Flight not found');

    const seat = await this.seatRepo.findOne({ where: { id: dto.seatId } });
    if (!seat) throw new NotFoundException('Seat not found');

    let payment: Payment | null = null;
    if (dto.paymentId) {
      payment = await this.paymentRepo.findOne({ where: { id: dto.paymentId } });
      if (!payment) throw new NotFoundException('Payment not found');
    }
    const ticket = this.ticketRepo.create({
      price: Number(dto.price),
      status: dto.status ?? 'BOOKED',
      user,
      flight,
      seat,
      ...(payment ? { payment } : {}), 
    });
    
    
    return await this.ticketRepo.save(ticket);
    
  }

  
  findAll(): Promise<Ticket[]> {
    return this.ticketRepo.find({
      relations: ['user', 'flight', 'seat', 'payment'],
    });
  }

  
  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepo.findOne({
      where: { id },
      relations: ['user', 'flight', 'seat', 'payment'],
    });
    if (!ticket) throw new NotFoundException('Ticket not found');
    return ticket;
  }

  
  async update(id: string, dto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepo.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('User not found');
      ticket.user = user;
    }

    if (dto.flightId) {
      const flight = await this.flightRepo.findOne({ where: { id: dto.flightId } });
      if (!flight) throw new NotFoundException('Flight not found');
      ticket.flight = flight;
    }

    if (dto.seatId) {
      const seat = await this.seatRepo.findOne({ where: { id: dto.seatId } });
      if (!seat) throw new NotFoundException('Seat not found');
      ticket.seat = seat;
    }

    if (dto.paymentId) {
      const payment = await this.paymentRepo.findOne({ where: { id: dto.paymentId } });
      if (!payment) throw new NotFoundException('Payment not found');
      ticket.payment = payment;
    }

    Object.assign(ticket, dto);
    return this.ticketRepo.save(ticket);
  }

  
  async remove(id: string): Promise<void> {
    const ticket = await this.findOne(id);
    await this.ticketRepo.remove(ticket);
  }
}
