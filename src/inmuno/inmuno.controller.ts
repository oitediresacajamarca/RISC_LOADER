import { Controller, Get, Param } from '@nestjs/common';
import { InmunoService } from './inmuno.service';

@Controller('inmuno')
export class InmunoController {
constructor(private inmuns:InmunoService){

}

    @Get('')
    devolverInmuno(){
        this.inmuns.descargarRptPlano()
        return 'datito'
    }  
    @Get('covid')
    async devolverVacunaCovid(){
     await   this.inmuns.descargarVacCovid()
        return 'datito'
    }
    @Get('ver')
    async devolverVac(){
  let   rest =  await   this.inmuns.VER()
        return rest
    }

    @Get('decargarPeriodoCovid/:anio/:mes')
    async decargarPeriodoCovid(@Param('anio') anio:number,@Param('mes') mes:number){
        console.log(anio)
  let   rest =  await   this.inmuns.descargarVacCovidPeriodo(anio,mes)
        return rest
    }

}
