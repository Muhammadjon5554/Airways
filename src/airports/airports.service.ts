import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from './entities/airport.entity';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';
import { City } from '../cities/entities/city.entity';

@Injectable()
export class AirportsService {
  constructor( 
    @InjectRepository(Airport)
    private readonly airportRepo: Repository<Airport>,
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
  ) {}
  async create(dto: CreateAirportDto) {
     
    const city = await this.cityRepo.findOneBy({ id: dto.cityId });
    if (!city) {
      throw new NotFoundException('City not found');
    }
  
    const airport = this.airportRepo.create({
      name: dto.name,
      code: dto.code,
      city: city
    });
  
    return this.airportRepo.save(airport);
  }
  
  

  findAll(): Promise<Airport[]> {
    return this.airportRepo.find({
      relations: ['city', 'departures', 'arrivals'],
    });
  }

  async findOne(id: string): Promise<Airport> {
    const airport = await this.airportRepo.findOne({
      where: { id },
      relations: ['city', 'departures', 'arrivals'],
    });
    if (!airport) throw new NotFoundException('Airport not found');
    return airport;
  }

  async update(id: string, dto: UpdateAirportDto): Promise<Airport> {
    const airport = await this.findOne(id);

    if (dto.cityId) {
      const city = await this.cityRepo.findOne({ where: { id: dto.cityId } });
      if (!city) throw new NotFoundException('City not found');
      airport.city = city;
    }

    if (dto.name) airport.name = dto.name;
    if (dto.code) airport.code = dto.code;

    return await this.airportRepo.save(airport);
  }

  async remove(id: string): Promise<void> {
    const airport = await this.findOne(id);
    await this.airportRepo.remove(airport);
  }
}
