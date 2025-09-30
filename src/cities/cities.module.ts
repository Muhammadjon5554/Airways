import { Module } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { City } from './entities/city.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/countries/entities/country.entity';

@Module({
  imports: [TypeOrmModule.forFeature([City,Country])],
  controllers: [CitiesController],
  providers: [CitiesService],
})
export class CitiesModule {}
