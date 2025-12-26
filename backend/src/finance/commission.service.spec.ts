import { Test } from '@nestjs/testing';
import { CommissionService } from './commission.service';
import { CommissionRule } from './commission.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CommissionService', () => {
  let svc: CommissionService;
  const mockRepo = { find: jest.fn(), create: jest.fn(), save: jest.fn(), update: jest.fn(), delete: jest.fn(), findOneBy: jest.fn() };

  beforeEach(async () => {
    const module = await Test.createTestingModule({ providers: [CommissionService, { provide: getRepositoryToken(CommissionRule), useValue: mockRepo }] }).compile();
    svc = module.get(CommissionService);
  });

  it('list calls repo.find', async () => {
    (mockRepo.find as any).mockResolvedValue([]);
    const res = await svc.list();
    expect(mockRepo.find).toHaveBeenCalled();
    expect(res).toEqual([]);
  });
});
