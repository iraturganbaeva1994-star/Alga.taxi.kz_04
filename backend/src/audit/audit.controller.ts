import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuditService } from './audit.service';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';

@Controller('admin/audit')
@UseGuards(RolesGuard)
export class AuditController {
  constructor(private svc: AuditService) {}

  @Get()
  @Roles('admin')
  async list() {
    return this.svc.list(200);
  }
}
