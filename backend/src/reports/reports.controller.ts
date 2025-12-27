import { Controller, Get, Query, UseGuards, Header } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrdersReportQueryDto } from './dto/reports.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@Controller('api/admin/reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('reports')
export class ReportsController {
  constructor(private svc: ReportsService) {}

  @Get('orders')
  @Roles('admin')
  @ApiOperation({ summary: 'Orders report (paged + filters + export)' })
  async orders(@Query() query: OrdersReportQueryDto) {
    const limit = parseInt((query as any).limit || '100', 10);
    const offset = parseInt((query as any).offset || '0', 10);
    const rows = await this.svc.ordersList(query, limit, offset);
    if ((query as any).export === 'csv') {
      // simple CSV generation
      const headers = ['order_id','city_id','driver_id','client_id','client_phone','service_type','payment_type','dispatcher_id','created_at','accepted_at','cancelled_at','completed_at'];
      const csv = [headers.join(',')].concat(rows.map((r: any) => headers.map(h => (r[h] ?? '')).join(','))).join('\n');
      return { csv };
    }
    const total = await this.svc.ordersCount(query);
    return { total, limit, offset, data: rows };
  }

  @Get('driver-shifts')
  @Roles('admin')
  @ApiOperation({ summary: 'Driver shifts report (paged + summary)' })
  async driverShifts(@Query() query: any) {
    return { data: await this.svc.driverShifts(query) };
  }

  @Get('clients')
  @Roles('admin')
  @ApiOperation({ summary: 'Clients report' })
  async clients(@Query() query: any) {
    return { data: await this.svc.clientsReport(query) };
  }

  @Get('messages')
  @Roles('admin')
  @ApiOperation({ summary: 'SMS/WhatsApp logs' })
  async messages(@Query() query: any) {
    return { data: await this.svc.messagesLog(query) };
  }
}
