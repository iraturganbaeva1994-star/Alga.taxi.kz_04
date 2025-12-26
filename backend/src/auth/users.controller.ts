import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from '../shared/user.decorator';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@User() user: any) {
    if (!user) return null;
    return { id: user.id, phone: user.phone, role: user.role || 'client', lang_pref: user.lang_pref || 'ru' };
  }
}
