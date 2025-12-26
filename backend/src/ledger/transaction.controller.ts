import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';

@Controller('admin/transactions')
@UseGuards(RolesGuard)
export class TransactionController {
  constructor(private svc: TransactionService) {}

  @Post()
  @Roles('admin')
  async create(@Body() body: CreateTransactionDto) {
    return this.svc.create(body as any);
  }

  @Get('user/:userId')
  @Roles('admin','dispatcher')
  async listForUser(@Param('userId') userId: string, @Query('limit') limit?: string) {
    return this.svc.listForUser(userId, limit ? parseInt(limit) : 100);
  }
}
