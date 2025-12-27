import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserBlock } from './blocks.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class BlocksService {
  constructor(
    @InjectRepository(UserBlock)
    private repo: Repository<UserBlock>,
    private audit: AuditService
  ) {}

  async listForUser(userId: string) {
    return this.repo.find({ where: { user_id: userId } });
  }

  async create(blockData: Partial<UserBlock>, actorId?: string) {
    const ent = this.repo.create(blockData as any);
    const saved = await this.repo.save(ent) as any;
    await this.audit.log(actorId, 'user_block_create', 'user_blocks', saved.id, saved);
    return saved;
  }

  async unblock(id: string, actorId?: string) {
    const b = await this.repo.findOneBy({ id });
    if (!b) return null;
    b.active = false;
    const saved = await this.repo.save(b) as any;
    await this.audit.log(actorId, 'user_block_remove', 'user_blocks', b.id, saved);
    return saved;
  }
}
