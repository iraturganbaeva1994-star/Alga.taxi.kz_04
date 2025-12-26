import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { PenaltyService } from './penalty.service';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';

@Controller('admin/penalties')
@UseGuards(RolesGuard)
export class PenaltyController {
  constructor(private svc: PenaltyService) {}

  @Post()
  @Roles('admin')
  async create(@Body() body: any) {
    return this.svc.create(body);
  }
}
