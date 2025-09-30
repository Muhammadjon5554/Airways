import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepo: Repository<Class>,
  ) {}

  async create(dto: CreateClassDto): Promise<Class> {
    const seatClass = this.classRepo.create({
      name: dto.name,
      priceMultiplier: dto.priceMultiplier,
    });
    return await this.classRepo.save(seatClass);
  }

  findAll(): Promise<Class[]> {
    return this.classRepo.find({ relations: ['seats'] });
  }

  async findOne(id: string): Promise<Class> {
    const seatClass = await this.classRepo.findOne({
      where: { id },
      relations: ['seats'],
    });
    if (!seatClass) throw new NotFoundException('Class not found');
    return seatClass;
  }

  async update(id: string, dto: UpdateClassDto): Promise<Class> {
    const seatClass = await this.findOne(id);
    Object.assign(seatClass, dto);
    return await this.classRepo.save(seatClass);
  }

  async remove(id: string): Promise<void> {
    const seatClass = await this.findOne(id);
    await this.classRepo.remove(seatClass);
  }
}
