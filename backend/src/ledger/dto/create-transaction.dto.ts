import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @IsNotEmpty()
  @IsString()
  type: 'credit' | 'debit' | 'reversal';

  @IsNotEmpty()
  @IsNumber()
  amount_cents: number;

  @IsOptional()
  @IsString()
  related_order?: string;

  @IsOptional()
  metadata?: any;
}
