import { Injectable, Optional } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationLog } from '../notifications/notification-log.entity';


@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    @Optional()
    @InjectRepository(NotificationLog)
    private notifRepo?: Repository<NotificationLog>) {}

  // Mock: send code via SMS
  async requestCode(phone: string, channel: 'sms' | 'whatsapp' | 'both' = 'sms') {
    // TODO: integrate providers (Twilio/WhatsApp API). For scaffold: log to notifications_log
    const requestId = 'req_' + Date.now();
    const now = new Date();
    if ((channel === 'sms' || channel === 'both') && this.notifRepo) {
      await this.notifRepo.save(this.notifRepo.create({ to_phone: phone, channel: 'sms', provider: 'mock-sms', message: `Code for ${phone}: 1234`, provider_status: 'sent', provider_response: { requestId }, created_at: now } as any));
    }
    if ((channel === 'whatsapp' || channel === 'both') && this.notifRepo) {
      await this.notifRepo.save(this.notifRepo.create({ to_phone: phone, channel: 'whatsapp', provider: 'mock-whatsapp', message: `Code for ${phone}: 1234`, provider_status: 'sent', provider_response: { requestId }, created_at: now } as any));
    }
    return { requestId };
  }

  async verifyCode(phone: string, code: string) {
    // TODO: verify code (match with stored code)
    const role = 'client';
    const payload = { phone, role };
    const subject = phone;
    const accessToken = this.jwtService.sign(payload, { subject, expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
    const refreshToken = this.jwtService.sign(payload, { subject, expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
    return { accessToken, refreshToken, user: { phone, role } };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const role = payload.role || 'client';
      const phone = payload.phone;
      const subject = phone;
      const newAccess = this.jwtService.sign({ phone, role }, { subject, expiresIn: process.env.JWT_EXPIRES_IN || '1h' });
      const newRefresh = this.jwtService.sign({ phone, role }, { subject, expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' });
      return { accessToken: newAccess, refreshToken: newRefresh };
    } catch (err) {
      return null;
    }
  }

  async logout(_refreshToken: string) {
    // For scaffold: we don't persist token blacklist. Client should discard tokens.
    return { ok: true };
  }
}
