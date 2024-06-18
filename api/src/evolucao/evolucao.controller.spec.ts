import { Test, TestingModule } from '@nestjs/testing';
import { EvolucaoController } from './evolucao.controller';
import { EvolucaoService } from './evolucao.service';

describe('EvolucaoController', () => {
  let controller: EvolucaoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvolucaoController],
      providers: [EvolucaoService],
    }).compile();

    controller = module.get<EvolucaoController>(EvolucaoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
