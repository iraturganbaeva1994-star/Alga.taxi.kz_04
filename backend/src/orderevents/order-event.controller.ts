import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { OrderEventService } from './order-event.service';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';

@Controller('orders')
@UseGuards(RolesGuard)
export class OrderEventController {
  constructor(private svc: OrderEventService) {}

  @Post(':id/events')
  @Roles('admin','dispatcher','driver','client')
  async create(@Param('id') orderId: string, @Body() body: any) {
    return this.svc.create({ order_id: orderId, event: body.event, actor_user_id: body.actor_user_id, payload: body.payload });
  }

  @Get(':id/events')
  @Roles('admin','dispatcher','driver','client')
  async list(@Param('id') orderId: string) {
    return this.svc.listForOrder(orderId);
  }
}
