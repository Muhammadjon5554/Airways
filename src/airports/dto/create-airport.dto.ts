import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateAirportDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;
 
  @IsNotEmpty()
  @IsUUID()
  cityId: string;    
}
