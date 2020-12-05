import { Test, TestingModule } from '@nestjs/testing';
import { InmunoController } from './inmuno.controller';

describe('InmunoController', () => {
  let controller: InmunoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InmunoController],
    }).compile();

    controller = module.get<InmunoController>(InmunoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
