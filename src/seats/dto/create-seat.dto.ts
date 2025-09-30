import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateSeatDto {
  @IsString()
  @IsNotEmpty()
  seatNumber: string;

  @IsUUID()
  @IsNotEmpty()
  planeId: string;

  @IsUUID()
  @IsNotEmpty()
  seatClassId: string;
}
