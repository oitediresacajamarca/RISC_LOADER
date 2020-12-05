import { Test, TestingModule } from '@nestjs/testing';
import { InmunoService } from './inmuno.service';

describe('InmunoService', () => {
  let service: InmunoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InmunoService],
    }).compile();

    service = module.get<InmunoService>(InmunoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
