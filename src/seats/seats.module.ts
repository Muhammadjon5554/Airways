import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seat } from './entities/seat.entity';
import { Plane } from 'src/planes/entities/plane.entity';
import { Class } from 'src/classes/entities/class.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Seat,Plane,Class])],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
