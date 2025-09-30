import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plane } from './entities/plane.entity';
import { CreatePlaneDto } from './dto/create-plane.dto';
import { UpdatePlaneDto } from './dto/update-plane.dto';
import { Company } from 'src/companies/entities/company.entity';

@Injectable()
export class PlanesService {
  
  constructor(
    @InjectRepository(Plane) private readonly planeRepo: Repository<Plane>,
    

    @InjectRepository(Company)
    private readonly companyRepo: Repository<Company>,
  ) {}

  async create(dto: CreatePlaneDto): Promise<Plane> {
    const company = await this.companyRepo.findOne({ where: { id: dto.companyId } });
    if (!company) {                         
      throw new NotFoundException('Company not found');
    }
  
    const plane = this.planeRepo.create({
      name: dto.name,
      model: dto.model,
      company,                                 
    });
  
    return await this.planeRepo.save(plane);
  }
  
  

  findAll(): Promise<Plane[]> {
    return this.planeRepo.find({ relations: ['seats', 'flights'] });
  }

  async findOne(id: string): Promise<Plane> {
    const plane = await this.planeRepo.findOne({ where: { id } });
    if (!plane) throw new NotFoundException('Plane not found');
    return plane;
  }
  
  async update(id: string, dto: UpdatePlaneDto): Promise<Plane> {
    const plane = await this.findOne(id);
    Object.assign(plane, dto);
    return await this.planeRepo.save(plane);
  }
  
  async remove(id: string): Promise<void> {
    const plane = await this.findOne(id);
    await this.planeRepo.remove(plane);
  }
}  