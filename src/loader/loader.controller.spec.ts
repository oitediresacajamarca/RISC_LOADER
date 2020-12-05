import { Test, TestingModule } from '@nestjs/testing';
import { LoaderController } from './loader.controller';

describe('LoaderController', () => {
  let controller: LoaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoaderController],
    }).compile();

    controller = module.get<LoaderController>(LoaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
