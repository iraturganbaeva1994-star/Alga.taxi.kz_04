import { IsOptional, IsString, IsIn, IsNumberString } from 'class-validator';

export class OrdersReportQueryDto {
  @IsOptional()
  @IsString()
  date_from?: string;

  @IsOptional()
  @IsString()
  date_to?: string;

  @IsOptional()
  @IsString()
  city_id?: string;

  @IsOptional()
  @IsString()
  driver_id?: string;

  @IsOptional()
  @IsString()
  client_id?: string;

  @IsOptional()
  @IsString()
  @IsIn(['created','accepted','cancelled','completed'])
  status?: string;

  @IsOptional()
  @IsString()
  service_type?: string;

  @IsOptional()
  @IsString()
  payment_type?: string;

  @IsOptional()
  @IsString()
  dispatcher_id?: string;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsNumberString()
  offset?: string;

  @IsOptional()
  @IsString()
  export?: string; // 'csv' or 'json'
}
