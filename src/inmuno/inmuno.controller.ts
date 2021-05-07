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
    @Get('consultar/:num_doc')
    async devolverVacunciones(@Param('num_doc') num_doc:string)
    {

    let resp=await    this.inmuns.consultarDni(num_doc)
    return resp

    }

    @Get('consultar/:anio/:mes/:dia')
    async devolverVacuncionesDia(@Param() param:any)
    {

    let resp=await    this.inmuns.devolverVacunaCovidDia(param.anio,param.mes,param.dia)
    return resp

    }

}
