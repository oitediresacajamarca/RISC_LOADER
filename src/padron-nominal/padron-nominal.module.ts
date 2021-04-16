import { Module } from '@nestjs/common';
import { PadronNominalService } from './padron-nominal.service';
import { PadronNominalController } from './padron-nominal.controller';

@Module({
  providers: [PadronNominalService],
  controllers: [PadronNominalController]
})
export class PadronNominalModule {}
