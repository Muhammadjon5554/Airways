import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Ticket } from '../tickets/entities/ticket.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentRepo: Repository<Payment>,
    @InjectRepository(Ticket) private readonly ticketRepo: Repository<Ticket>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const ticket = await this.ticketRepo.findOne({ where: { id: dto.ticketId } });
    if (!ticket) throw new NotFoundException('Ticket not found');
  
    const payment = this.paymentRepo.create({
      amount: dto.amount,
      method: dto.method,
      status: dto.status ?? 'PENDING',
      ticket,                      
    });
  
    return await this.paymentRepo.save(payment);
  }
  

  findAll(): Promise<Payment[]> {
    return this.paymentRepo.find({ relations: ['ticket'] });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({
      where: { id },
      relations: ['ticket'],
    });
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async update(id: string, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.findOne(id);

    if (dto.ticketId) {
      const ticket = await this.ticketRepo.findOne({ where: { id: dto.ticketId } });
      if (!ticket) throw new NotFoundException('Ticket not found');
      payment.ticket = ticket;
    }

    Object.assign(payment, dto);
    return await this.paymentRepo.save(payment);
  }

  async remove(id: string): Promise<void> {
    const payment = await this.findOne(id);
    await this.paymentRepo.remove(payment);
  }
}
