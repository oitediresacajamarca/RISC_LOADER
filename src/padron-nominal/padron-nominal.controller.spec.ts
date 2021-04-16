import { Test, TestingModule } from '@nestjs/testing';
import { PadronNominalController } from './padron-nominal.controller';

describe('PadronNominalController', () => {
  let controller: PadronNominalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PadronNominalController],
    }).compile();

    controller = module.get<PadronNominalController>(PadronNominalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
