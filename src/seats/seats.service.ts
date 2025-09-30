import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Seat } from './entities/seat.entity';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Plane } from '../planes/entities/plane.entity';
import { Class } from 'src/classes/entities/class.entity';

@Injectable()
export class SeatsService {

  constructor(
    @InjectRepository(Seat) private readonly seatRepo: Repository<Seat>,
    @InjectRepository(Plane) private readonly planeRepo: Repository<Plane>,
    @InjectRepository(Class) private readonly classRepo: Repository<Class>,

  ) {}

  
  async create(dto: CreateSeatDto): Promise<Seat> {
    const plane = await this.planeRepo.findOne({ where: { id: dto.planeId } });
    if (!plane) throw new NotFoundException('Plane not found');

    const seatClass = await this.classRepo.findOne({ where: { id: dto.seatClassId } });
    if (!seatClass) throw new NotFoundException('Class not found');

    const seat = this.seatRepo.create({
      seatNumber: dto.seatNumber,
      plane,
      seatClass,   
    });
    return await this.seatRepo.save(seat);
    
  }

  
  findAll(): Promise<Seat[]> {
    return this.seatRepo.find({ relations: ['plane', 'tickets'] });
  }


  async findOne(id: string): Promise<Seat> {
    const seat = await this.seatRepo.findOne({
      where: { id },
      relations: ['plane', 'tickets'],
    });
    if (!seat) throw new NotFoundException('Seat not found');
    return seat;
  }


  async update(id: string, dto: UpdateSeatDto): Promise<Seat> {
    const seat = await this.findOne(id);

    if (dto.planeId) {
      const plane = await this.planeRepo.findOne({ where: { id: dto.planeId } });
      if (!plane) throw new NotFoundException('Plane not found');
      seat.plane = plane;
    }

    Object.assign(seat, dto);
    return await this.seatRepo.save(seat);
  }

  
  async remove(id: string): Promise<void> {
    const seat = await this.findOne(id);
    await this.seatRepo.remove(seat);
  }
}
