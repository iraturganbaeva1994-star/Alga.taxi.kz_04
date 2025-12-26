import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEvent } from './order-event.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class OrderEventService {
  constructor(@InjectRepository(OrderEvent) private repo: Repository<OrderEvent>, private audit: AuditService) {}

  async create(evt: Partial<OrderEvent>, actorId?: string) {
    const ent = this.repo.create(evt as any);
    const saved = await this.repo.save(ent);
    await this.audit.log(actorId, 'order_event', 'order_events', saved.id, saved);
    return saved;
  }

  async listForOrder(orderId: string, limit = 500) {
    return this.repo.find({ where: { order_id: orderId }, order: { created_at: 'ASC' }, take: limit });
  }
}
