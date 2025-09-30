import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { LoyaltyService } from './loyalty.service';
import { CreateLoyaltyDto } from './dto/create-loyalty.dto';
import { UpdateLoyaltyDto } from './dto/update-loyalty.dto';

@Controller('loyalties')
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @Post()
  create(@Body() dto: CreateLoyaltyDto) {
    return this.loyaltyService.create(dto);
  }

  @Get()
  findAll() {
    return this.loyaltyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loyaltyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateLoyaltyDto) {
    return this.loyaltyService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loyaltyService.remove(id);
  }
}
