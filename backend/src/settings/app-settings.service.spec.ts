import { Test } from '@nestjs/testing';
import { AppSettingsService } from './app-settings.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppSetting } from './app-settings.entity';

describe('AppSettingsService', () => {
  let service: AppSettingsService;
  let repo: Repository<AppSetting>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppSettingsService,
        { provide: getRepositoryToken(AppSetting), useValue: { find: jest.fn(), findOneBy: jest.fn(), create: jest.fn(), save: jest.fn() } }
      ]
    }).compile();

    service = module.get(AppSettingsService);
    repo = module.get(getRepositoryToken(AppSetting));
  });

  it('getAll returns empty object when repo empty', async () => {
    (repo.find as any).mockResolvedValue([]);
    const res = await service.getAll();
    expect(res).toEqual({});
  });

  it('upsert creates new setting when missing', async () => {
    (repo.findOneBy as any).mockResolvedValue(null);
    const created = { key: 'k', value: { enabled: true } } as any;
    (repo.create as any).mockReturnValue(created);
    (repo.save as any).mockResolvedValue(created);
    const res = await service.upsert('k', { enabled: true });
    expect(repo.create).toHaveBeenCalled();
    expect(repo.save).toHaveBeenCalledWith(created);
  });
});
