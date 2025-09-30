import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { Country } from '../countries/entities/country.entity';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepo: Repository<City>,
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  async create(dto: CreateCityDto): Promise<City> {
    const country = await this.countryRepo.findOne({ where: { id: dto.countryId } });
    if (!country) throw new NotFoundException('Country not found');

    const city = this.cityRepo.create({
      name: dto.name,
      country,
    });
    return await this.cityRepo.save(city);
  }

  findAll(): Promise<City[]> {
    return this.cityRepo.find({ relations: ['country', 'airports'] });
  }

  async findOne(id: string): Promise<City> {
    const city = await this.cityRepo.findOne({
      where: { id },
      relations: ['country', 'airports'],
    });
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  async update(id: string, dto: UpdateCityDto): Promise<City> {
    const city = await this.findOne(id);

    if (dto.countryId) {
      const country = await this.countryRepo.findOne({ where: { id: dto.countryId } });
      if (!country) throw new NotFoundException('Country not found');
      city.country = country;
    }

    if (dto.name) city.name = dto.name;
    return await this.cityRepo.save(city);
  }

  async remove(id: string): Promise<void> {
    const city = await this.findOne(id);
    await this.cityRepo.remove(city);
  }
}
