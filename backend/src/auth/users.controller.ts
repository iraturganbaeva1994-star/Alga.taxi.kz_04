import { Controller, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(private jwtService: JwtService) {}

  @Get('me')
  async me(@Headers('authorization') auth?: string) {
    if (!auth) throw new UnauthorizedException();
    const parts = auth.split(' ');
    if (parts.length !== 2) throw new UnauthorizedException();
    const token = parts[1];
    try {
      const payload = this.jwtService.verify(token);
      return { id: payload.sub || payload.userId || null, phone: payload.phone, role: payload.role || 'client', lang_pref: payload.lang_pref || 'ru' };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
