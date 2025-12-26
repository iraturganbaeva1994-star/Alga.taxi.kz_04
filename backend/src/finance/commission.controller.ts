import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CommissionService } from './commission.service';
import { CreateCommissionDto } from './dto/create-commission.dto';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';

@Controller('admin/commission')
@UseGuards(RolesGuard)
export class CommissionController {
  constructor(private svc: CommissionService) {}

  @Get()
  @Roles('admin')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Roles('admin')
  async create(@Body() body: CreateCommissionDto) {
    return this.svc.create(body as any);
  }

  @Patch(':id')
  @Roles('admin')
  async update(@Param('id') id: string, @Body() body: Partial<CreateCommissionDto>) {
    return this.svc.update(id, body as any);
  }

  @Delete(':id')
  @Roles('admin')
  async delete(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}
