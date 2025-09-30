import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AirportsService } from './airports.service';
import { CreateAirportDto } from './dto/create-airport.dto';
import { UpdateAirportDto } from './dto/update-airport.dto';

@Controller('airports')
export class AirportsController {
  constructor(private readonly airportsService: AirportsService) {}

  @Post()
  create(@Body() dto: CreateAirportDto) { 
    return this.airportsService.create(dto);
  }
  

  @Get()
  findAll() {
    return this.airportsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.airportsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateAirportDto) {
    return this.airportsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.airportsService.remove(id);
  }
}
