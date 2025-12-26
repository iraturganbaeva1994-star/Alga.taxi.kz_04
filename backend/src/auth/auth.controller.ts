import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('request-code')
  async requestCode(@Body() body: { phone: string; channel?: 'sms'|'whatsapp'|'both' }) {
    return this.authService.requestCode(body.phone, body.channel || 'sms');
  }

  @Post('verify')
  async verify(@Body() body: { phone: string; code: string }) {
    return this.authService.verifyCode(body.phone, body.code);
  }
}
