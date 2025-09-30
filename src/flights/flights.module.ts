import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flight } from './entities/flight.entity';
import { Plane } from 'src/planes/entities/plane.entity';
import { Airport } from 'src/airports/entities/airport.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Flight,Plane,Airport])],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
