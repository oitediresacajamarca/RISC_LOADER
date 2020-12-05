import { Controller, Get, Param } from '@nestjs/common';
import { LoaderService } from './loader.service';

@Controller('loader')
export class LoaderController {

    constructor(private loaders: LoaderService) {

    }
    @Get('personal')
    CargarPersonal() {
        this.loaders.DescargarMaestropPersonalRegional()
        return 'personal cargado'

    }
    @Get('registrador')
    CargarRegistrador() {
        this.loaders.DesacargarMaestroRegistradorRegional()
        return 'personal cargado'

    }
    @Get('reporte_plano')
    CargarReportePlano() {
        this.loaders.DescargarReportePlano(11, 2019,7)
        return 'personal cargado'


    }

    @Get('reporte_plano/:anio/:mes')
    CargarReportePlanoPeriodo(@Param('anio') anio: number, @Param('mes') mes: number) {
        this.loaders.DescargarReportePlano(mes, anio,5)
        return 'personal cargado'

    }

    @Get('reporte_plano/:anio')
    CargarReportePlanoAnual(@Param('anio') anio: number) {
        let mes = 1
        while (mes <= 12) {
            this.loaders.DescargarReportePlano(mes, anio,8)
            mes = mes + 1
        }

        return 'personal cargado'

    }

    @Get('PuntosDigitacionHis')
    async CargarPuntosDigitacionHisMinsa() {
        const res= await this.loaders.CargarPuntosDigitacionHisMinsa()
        return res

    }


    @Get('cargas/maestropaciente')
    async CargarMaestrosPaciente() {
        const res= await this.loaders.cargarMaestroPacienteTodosPuntosDigitacion()
        return res

    }
}
