import { Test, TestingModule } from '@nestjs/testing';
import { MaestroEstablecimientoService } from './maestro-establecimiento.service';

describe('MaestroEstablecimientoService', () => {
  let service: MaestroEstablecimientoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MaestroEstablecimientoService],
    }).compile();

    service = module.get<MaestroEstablecimientoService>(MaestroEstablecimientoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
