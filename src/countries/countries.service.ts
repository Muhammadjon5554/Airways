import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepo: Repository<Country>,
  ) {}

  async create(dto: CreateCountryDto): Promise<Country> {
    const country = this.countryRepo.create({
      name: dto.name,
      code: dto.code ?? null,
    });
    return await this.countryRepo.save(country);
  }

  findAll(): Promise<Country[]> {
    return this.countryRepo.find({ relations: ['cities'] });
  }

  async findOne(id: string): Promise<Country> {
    const country = await this.countryRepo.findOne({
      where: { id },
      relations: ['cities'],
    });
    if (!country) throw new NotFoundException('Country not found');
    return country;
  }

  async update(id: string, dto: UpdateCountryDto): Promise<Country> {
    const country = await this.findOne(id);
    Object.assign(country, dto);
    return await this.countryRepo.save(country);
  }

  async remove(id: string): Promise<void> {
    const country = await this.findOne(id);
    await this.countryRepo.remove(country);
  }
}
