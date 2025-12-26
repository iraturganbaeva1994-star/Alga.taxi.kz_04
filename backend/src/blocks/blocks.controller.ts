import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { BlocksService } from './blocks.service';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';

@Controller('admin/blocks')
@UseGuards(RolesGuard)
export class BlocksController {
  constructor(private svc: BlocksService) {}

  @Get('user/:userId')
  @Roles('admin', 'dispatcher')
  async listForUser(@Param('userId') userId: string) {
    return this.svc.listForUser(userId);
  }

  @Post()
  @Roles('admin')
  async create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Delete(':id')
  @Roles('admin')
  async unblock(@Param('id') id: string) {
    return this.svc.unblock(id);
  }
}
