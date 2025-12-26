import { IsIn, IsOptional, IsNumber, IsString } from 'class-validator';

export class CreateCommissionDto {
  @IsIn(['global', 'service', 'driver'])
  scope: 'global' | 'service' | 'driver';

  @IsOptional()
  @IsString()
  service_type?: string;

  @IsOptional()
  @IsString()
  driver_id?: string;

  @IsNumber()
  percent: number;
}
