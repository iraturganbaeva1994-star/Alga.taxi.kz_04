import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './audit.entity';

@Injectable()
export class AuditService {
  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  async log(actorId: string | undefined, action: string, target_table?: string, target_id?: string, payload?: any) {
    const ent = this.repo.create({ actor_user_id: actorId, action, target_table, target_id, payload } as any);
    return this.repo.save(ent);
  }

  async list(limit = 100) {
    return this.repo.find({ order: { created_at: 'DESC' }, take: limit });
  }
}
