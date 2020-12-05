import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InmunoService } from './inmuno/inmuno.service';
import { InmunoModule } from './inmuno/inmuno.module';
import { LoaderModule } from './loader/loader.module';

@Module({
  imports: [InmunoModule, LoaderModule],
  controllers: [AppController],
  providers: [AppService, InmunoService],
})
export class AppModule {}
