import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { Review } from './entities/review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Flight } from 'src/flights/entities/flight.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review, User, Flight])],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
