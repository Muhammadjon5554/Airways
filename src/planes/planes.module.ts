import { Module } from '@nestjs/common';
import { PlanesService } from './planes.service';
import { PlanesController } from './planes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plane } from './entities/plane.entity';
import { Company } from 'src/companies/entities/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Plane,Company])],
  controllers: [PlanesController],
  providers: [PlanesService],
})
export class PlanesModule {}
