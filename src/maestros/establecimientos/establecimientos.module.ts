import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablecimientosController } from './establecimientos.controller';
import { MaestroEstablecimientoRepository } from './maestro-establecimiento.repository';
import { MaestroEstablecimientoService } from './maestro-establecimiento.service';

@Module({
  controllers: [EstablecimientosController],
  providers:[MaestroEstablecimientoService],
  imports: [TypeOrmModule.forFeature([MaestroEstablecimientoRepository])]
})
export class EstablecimientosModule {}
