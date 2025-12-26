import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationLog } from '../notifications/notification-log.entity';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    @InjectRepository(NotificationLog)
    private notifRepo: Repository<NotificationLog>) {}

  // Mock: send code via SMS
  async requestCode(phone: string, channel: 'sms' | 'whatsapp' | 'both' = 'sms') {
    // TODO: integrate providers (Twilio/WhatsApp API). For scaffold: log to notifications_log
    const requestId = 'req_' + Date.now();
    const now = new Date();
    if (channel === 'sms' || channel === 'both') {
      await this.notifRepo.save(this.notifRepo.create({ to_phone: phone, channel: 'sms', provider: 'mock-sms', message: `Code for ${phone}: 1234`, provider_status: 'sent', provider_response: { requestId }, created_at: now } as any));
    }
    if (channel === 'whatsapp' || channel === 'both') {
      await this.notifRepo.save(this.notifRepo.create({ to_phone: phone, channel: 'whatsapp', provider: 'mock-whatsapp', message: `Code for ${phone}: 1234`, provider_status: 'sent', provider_response: { requestId }, created_at: now } as any));
    }
    return { requestId };
  }

  async verifyCode(phone: string, code: string) {
    // TODO: verify code (match with stored code)
    const payload = { phone, role: 'client' };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken, user: { phone } };
  }
}
