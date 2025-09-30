import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { Ticket } from './entities/ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flights/entities/flight.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Seat } from 'src/seats/entities/seat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User, Flight, Seat, Payment])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
