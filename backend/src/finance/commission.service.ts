import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommissionRule } from './commission.entity';

@Injectable()
export class CommissionService {
  constructor(
    @InjectRepository(CommissionRule)
    private repo: Repository<CommissionRule>
  ) {}

  async list(): Promise<CommissionRule[]> {
    return this.repo.find();
  }

  async create(data: Partial<CommissionRule>) {
    const ent = this.repo.create(data as any);
    return this.repo.save(ent);
  }

  async update(id: string, data: Partial<CommissionRule>) {
    await this.repo.update(id, data as any);
    return this.repo.findOneBy({ id });
  }

  async remove(id: string) {
    return this.repo.delete({ id });
  }
}
