import { Test, TestingModule } from '@nestjs/testing';
import { PadronNominalService } from './padron-nominal.service';

describe('PadronNominalService', () => {
  let service: PadronNominalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PadronNominalService],
    }).compile();

    service = module.get<PadronNominalService>(PadronNominalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
