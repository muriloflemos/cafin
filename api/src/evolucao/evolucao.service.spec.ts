import { Test, TestingModule } from '@nestjs/testing';
import { EvolucaoService } from './evolucao.service';

describe('EvolucaoService', () => {
  let service: EvolucaoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EvolucaoService],
    }).compile();

    service = module.get<EvolucaoService>(EvolucaoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
