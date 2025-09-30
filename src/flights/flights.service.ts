import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from './entities/flight.entity';
import { CreateFlightDto } from './dto/create-flight.dto';
import { UpdateFlightDto } from './dto/update-flight.dto';
import { Plane } from '../planes/entities/plane.entity';
import { Airport } from '../airports/entities/airport.entity';

@Injectable()
export class FlightsService {
  constructor(
    @InjectRepository(Flight) private readonly flightRepo: Repository<Flight>,
    @InjectRepository(Plane) private readonly planeRepo: Repository<Plane>,
    @InjectRepository(Airport) private readonly airportRepo: Repository<Airport>,
  ) {}

  async create(dto: CreateFlightDto): Promise<Flight> {
    const plane = await this.planeRepo.findOne({ where: { id: dto.planeId } });
    if (!plane) throw new NotFoundException('Plane not found');

    const fromAirport = await this.airportRepo.findOne({ where: { id: dto.fromAirportId } });
    if (!fromAirport) throw new NotFoundException('From airport not found');

    const toAirport = await this.airportRepo.findOne({ where: { id: dto.toAirportId } });
    if (!toAirport) throw new NotFoundException('To airport not found');

    const flight = this.flightRepo.create({
      flightNumber: dto.flightNumber,
      plane,
      fromAirport,
      toAirport,
      departureTime: dto.departureTime,
      arrivalTime: dto.arrivalTime,
    });
    return await this.flightRepo.save(flight);
  }

  findAll(): Promise<Flight[]> {
    return this.flightRepo.find({
      relations: ['plane', 'fromAirport', 'toAirport', 'tickets'],
    });
  }

  async findOne(id: string): Promise<Flight> {
    const flight = await this.flightRepo.findOne({
      where: { id },
      relations: ['plane', 'fromAirport', 'toAirport', 'tickets'],
    });
    if (!flight) throw new NotFoundException('Flight not found');
    return flight;
  }

  async update(id: string, dto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.findOne(id);

    if (dto.planeId) {
      const plane = await this.planeRepo.findOne({ where: { id: dto.planeId } });
      if (!plane) throw new NotFoundException('Plane not found');
      flight.plane = plane;
    }

    if (dto.fromAirportId) {
      const fromAirport = await this.airportRepo.findOne({ where: { id: dto.fromAirportId } });
      if (!fromAirport) throw new NotFoundException('From airport not found');
      flight.fromAirport = fromAirport;
    }

    if (dto.toAirportId) {
      const toAirport = await this.airportRepo.findOne({ where: { id: dto.toAirportId } });
      if (!toAirport) throw new NotFoundException('To airport not found');
      flight.toAirport = toAirport;
    }

    Object.assign(flight, dto);
    return await this.flightRepo.save(flight);
  }

  async remove(id: string): Promise<void> {
    const flight = await this.findOne(id);
    await this.flightRepo.remove(flight);
  }
}
