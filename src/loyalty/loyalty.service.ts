import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Loyalty } from './entities/loyalty.entity';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LoyaltyService {
  constructor(
    @InjectRepository(Loyalty) private readonly loyaltyRepo: Repository<Loyalty>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateLoyaltyDto): Promise<Loyalty> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const loyalty = this.loyaltyRepo.create({
      points: dto.points,
      user: user,
    });
    return await this.loyaltyRepo.save(loyalty);
  }

  findAll(): Promise<Loyalty[]> {
    return this.loyaltyRepo.find({ relations: ['user'] });
  }

  async findOne(id: string): Promise<Loyalty> {
    const loyalty = await this.loyaltyRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!loyalty) throw new NotFoundException('Loyalty not found');
    return loyalty;
  }

  async update(id: string, dto: UpdateLoyaltyDto): Promise<Loyalty> {
    const loyalty = await this.findOne(id);

    if (dto.userId) {
      const user = await this.userRepo.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('User not found');
      loyalty.user = user;
    }

    Object.assign(loyalty, dto);
    return await this.loyaltyRepo.save(loyalty);
  }

  async remove(id: string): Promise<void> {
    const loyalty = await this.findOne(id);
    await this.loyaltyRepo.remove(loyalty);
  }
}
