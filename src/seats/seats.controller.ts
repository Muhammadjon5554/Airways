import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}


  @Post()
  create(@Body() dto: CreateSeatDto) {
    return this.seatsService.create(dto);
  }

  
  @Get()
  findAll() {
    return this.seatsService.findAll();
  }


  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.seatsService.findOne(id);
  }

  
  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateSeatDto,
  ) {
    return this.seatsService.update(id, dto);
  }

  
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.seatsService.remove(id);
  }
}
