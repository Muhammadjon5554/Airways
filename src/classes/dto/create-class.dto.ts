import { IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  priceMultiplier?: number;
}
