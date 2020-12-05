import { Module } from '@nestjs/common';
import { InmunoController } from './inmuno.controller';
import { InmunoService } from './inmuno.service';

@Module({
  controllers: [InmunoController],
  providers:[InmunoService]
})
export class InmunoModule {}
