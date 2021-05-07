import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InmunoService } from './inmuno/inmuno.service';
import { InmunoModule } from './inmuno/inmuno.module';
import { LoaderModule } from './loader/loader.module';
import { PadronNominalModule } from './padron-nominal/padron-nominal.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstablecimientosModule } from './maestros/establecimientos/establecimientos.module';

@Module({
  imports: [InmunoModule, LoaderModule, PadronNominalModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: '.',
      database: 'risc_2030',
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: false,
    }),
    EstablecimientosModule],
  controllers: [AppController],
  providers: [AppService, InmunoService],
})
export class AppModule {}
