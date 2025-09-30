import { IsNotEmpty, IsUUID, IsNumber } from 'class-validator';

export class CreateLoyaltyDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  points: number; 
  
}
