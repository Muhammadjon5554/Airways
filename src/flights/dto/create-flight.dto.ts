import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateFlightDto {
  @IsString()
  @IsNotEmpty()
  flightNumber: string;

  @IsString()
  planeId: string;

  @IsString()
  fromAirportId: string;

  @IsString()
  toAirportId: string;

  @IsDateString()
  departureTime: string;

  @IsDateString()
  arrivalTime: string;
}
