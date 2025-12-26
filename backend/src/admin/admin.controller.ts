import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../shared/roles.decorator';
import { RolesGuard } from '../shared/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  @Get('hello')
  @Roles('admin')
  hello() {
    return { msg: 'hello admin' };
  }
}
