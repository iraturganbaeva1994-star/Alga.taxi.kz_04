import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSetting } from './app-settings.entity';

@Injectable()
export class AppSettingsService {
  constructor(
    @InjectRepository(AppSetting)
    private repo: Repository<AppSetting>
  ) {}

  async getAll(): Promise<Record<string, any>> {
    const rows = await this.repo.find();
    const out: Record<string, any> = {};
    rows.forEach((r) => (out[r.key] = r.value));
    return out;
  }

  async get(key: string): Promise<any> {
    const row = await this.repo.findOneBy({ key });
    return row?.value;
  }

  async upsert(key: string, value: any) {
    const existing = await this.repo.findOneBy({ key });
    if (existing) {
      existing.value = value;
      existing.updated_at = new Date();
      return this.repo.save(existing);
    }
    const ent = this.repo.create({ key, value });
    return this.repo.save(ent);
  }
}
