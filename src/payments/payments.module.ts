import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/tickets/entities/ticket.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Payment,Ticket])],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}
