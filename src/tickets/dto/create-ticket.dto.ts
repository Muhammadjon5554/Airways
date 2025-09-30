import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUUID, IsEnum } from 'class-validator';

export enum TicketStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

export class CreateTicketDto {
  @IsUUID()
  @IsNotEmpty()
  flightId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsUUID()
  @IsNotEmpty()
  seatId: string;

  @IsEnum(TicketStatus)
  @IsOptional()
  status?: TicketStatus; 

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsUUID()
  @IsOptional()
  paymentId?: string;
}

