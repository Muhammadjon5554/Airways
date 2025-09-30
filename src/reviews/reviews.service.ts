import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from '../users/entities/user.entity';
import { Flight } from '../flights/entities/flight.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly reviewRepo: Repository<Review>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Flight) private readonly flightRepo: Repository<Flight>,
  ) {}

    async create(dto: CreateReviewDto): Promise<Review> {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');

    const flight = await this.flightRepo.findOne({ where: { id: dto.flightId } });
    if (!flight) throw new NotFoundException('Flight not found');

    const review = this.reviewRepo.create({
      comment: dto.comment,
      rating: dto.rating,
      user,
      flight,
    });

    return await this.reviewRepo.save(review);
  }


  findAll(): Promise<Review[]> {
    return this.reviewRepo.find({
      relations: ['user', 'flight'],
    });
  }

  
  async findOne(id: string): Promise<Review> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['user', 'flight'],
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  
  async update(id: string, dto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, dto);
    return await this.reviewRepo.save(review);
  }

  
  async remove(id: string): Promise<void> {
    const review = await this.findOne(id);
    await this.reviewRepo.remove(review);
  }
}
