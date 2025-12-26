import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Penalty } from './penalty.entity';
import { DriverBalance } from '../billing/driver-balance.entity';
import { InjectRepository as InjectRepo2 } from '@nestjs/typeorm';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class PenaltyService {
  constructor(
    @InjectRepository(Penalty)
    private repo: Repository<Penalty>,
    @InjectRepo2(DriverBalance)
    private balanceRepo: Repository<DriverBalance>,
    private audit: AuditService
  ) {}

  async create(pen: Partial<Penalty>, actorId?: string) {
    const ent = this.repo.create(pen as any);
    const saved = await this.repo.save(ent);
    // Apply to driver balance if applicable
    if (pen.user_id && pen.amount_cents) {
      const bal = await this.balanceRepo.findOneBy({ driver_id: pen.user_id });
      if (bal) {
        bal.balance_cents = Number(bal.balance_cents) - Number(pen.amount_cents);
        await this.balanceRepo.save(bal);
      } else {
        const nb = this.balanceRepo.create({ driver_id: pen.user_id, balance_cents: -Math.abs(pen.amount_cents) } as any);
        await this.balanceRepo.save(nb);
      }
    }
    await this.audit.log(actorId, 'penalty_create', 'penalties', saved.id, saved);
    return saved;
  }
}
