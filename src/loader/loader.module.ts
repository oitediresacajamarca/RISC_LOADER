import { Module } from '@nestjs/common';
import { LoaderService } from './loader.service';
import { LoaderController } from './loader.controller';
import { EstablecimientosModule } from 'src/maestros/establecimientos/establecimientos.module';
import { MaestroEstablecimientoRepository } from 'src/maestros/establecimientos/maestro-establecimiento.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [LoaderService],
  controllers: [LoaderController],
  imports:[EstablecimientosModule,TypeOrmModule.forFeature([MaestroEstablecimientoRepository])]
})
export class LoaderModule {}
