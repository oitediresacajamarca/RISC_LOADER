import { Controller, Get, Param, Response } from '@nestjs/common';
import { InmunoService } from './inmuno.service';

@Controller('inmuno')
export class InmunoController {
    constructor(private inmuns: InmunoService) {

    }

    @Get('')
    devolverInmuno() {
        this.inmuns.descargarRptPlano()
        return 'datito'
    }
    @Get('covid')
    async devolverVacunaCovid() {
      let resp=  await this.inmuns.descargarVacCovid()
        return {"mensaje":resp}
    }
    @Get('ver')
    async devolverVac() {
        let rest = await this.inmuns.VER()
        return rest
    }

    @Get('decargarPeriodoCovid/:anio/:mes')
    async decargarPeriodoCovid(@Param('anio') anio: number, @Param('mes') mes: number) {
        console.log(anio)
        let rest = await this.inmuns.descargarVacCovidPeriodo(anio, mes)
        return rest
    }
    @Get('consultar/:num_doc')
    async devolverVacunciones(@Param('num_doc') num_doc: string) {

        let resp = await this.inmuns.consultarDni(num_doc)
        return resp

    }

    @Get('consultardni/:num_doc')
    async devolverDatosRe(@Param('num_doc') num_doc: string, @Response() res) {
        let respuesta
        let resp = await this.inmuns.consultarDniReniec(num_doc)

        resp.on('data', (data) => {
            respuesta += data.toString()
        })
        let r = await resp.on('end', () => {
      

            return respuesta
        })

      
        return r.pipe(res)

    }

    @Get('consultar/:anio/:mes/:dia')
    async devolverVacuncionesDia(@Param() param: any, @Response() res) {

        let resp = await this.inmuns.devolverVacunaCovidDia(param.anio, param.mes, param.dia)
        console.log(resp)
        return resp

    }

}
