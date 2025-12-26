import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from './transaction.entity';
import { DriverBalance } from '../billing/driver-balance.entity';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private txRepo: Repository<Transaction>,
    @InjectRepository(DriverBalance)
    private balanceRepo: Repository<DriverBalance>,
    private audit: AuditService
  ) {}

  async create(data: Partial<Transaction>, actorId?: string) {
    // persist transaction
    const tx = this.txRepo.create(data as any);
    const saved = await this.txRepo.save(tx);

    // apply to balance if user is driver
    if (data.user_id && data.type) {
      const bal = await this.balanceRepo.findOneBy({ driver_id: data.user_id });
      const amount = Number(data.amount_cents || 0);
      if (bal) {
        if (data.type === 'credit') bal.balance_cents = Number(bal.balance_cents) + amount;
        else if (data.type === 'debit') bal.balance_cents = Number(bal.balance_cents) - amount;
        else if (data.type === 'reversal') bal.balance_cents = Number(bal.balance_cents) + amount;
        bal.updated_at = new Date();
        await this.balanceRepo.save(bal);
      } else {
        const init = { driver_id: data.user_id, balance_cents: data.type === 'debit' ? -Math.abs(amount) : amount } as any;
        await this.balanceRepo.save(this.balanceRepo.create(init));
      }
    }

    await this.audit.log(actorId, 'transaction_create', 'transactions', saved.id, saved);
    return saved;
  }

  async listForUser(userId: string, limit = 100) {
    return this.txRepo.find({ where: { user_id: userId }, order: { created_at: 'DESC' }, take: limit });
  }
}
