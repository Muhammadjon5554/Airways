import { IsString, IsUUID } from 'class-validator';

export class CreatePlaneDto {
  @IsString()
  name: string;

  @IsString()
  model: string;

  @IsUUID()
  companyId: string;  
}
