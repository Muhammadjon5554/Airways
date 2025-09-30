import { IsNotEmpty, IsNumber, IsString, IsUUID, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePaymentDto {
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  method: string;

  @IsOptional()
  @IsString()
  status?: string;   

  @IsUUID()
  @IsNotEmpty()
  ticketId: string;
}

