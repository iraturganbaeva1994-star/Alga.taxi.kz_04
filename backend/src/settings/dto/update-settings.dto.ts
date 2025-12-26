import { IsOptional, IsBoolean, ValidateNested, IsString, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

class ShowPhoneNumbersDto {
  @IsBoolean()
  enabled: boolean;
}

export class UpdateSettingsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => ShowPhoneNumbersDto)
  show_phone_numbers?: ShowPhoneNumbersDto;

  @IsOptional()
  @IsString()
  contact_number?: string;

  @IsOptional()
  @IsUrl()
  logo_url?: string;
}
