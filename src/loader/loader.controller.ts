import { Controller, Get, Param } from '@nestjs/common';
import { get } from 'http';
import { LoaderService } from './loader.service';

@Controller('loader')
export class LoaderController {

    constructor(private loaders: LoaderService) {

    }
    @Get('personal')
    async CargarPersonal() {
        await this.loaders.DescargarMaestropPersonalRegional()
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

        this.loaders.DescargarReportePlano(mes, anio,2)
       this.loaders.DescargarReportePlano(mes, anio,7)
        this.loaders.DescargarReportePlano(mes, anio,5)
        this.loaders.DescargarReportePlano(mes, anio,8)
        return 'personal cargado'

    }

    @Get('reporte_plano/:anio')
    async CargarReportePlanoAnual(@Param('anio') anio: number) {
        let mes = 1
        while (mes <= 3) {
          await  this.loaders.DescargarReportePlano(mes, anio,2)
          await  this.loaders.DescargarReportePlano(mes, anio,5)
          await   this.loaders.DescargarReportePlano(mes, anio,7)
          await   this.loaders.DescargarReportePlano(mes, anio,8)

            mes = mes + 1
        }

        return 'REPORTE PLANO CARGADO'+anio

    }

    @Get('PuntosDigitacionHis')
    async CargarPuntosDigitacionHisMinsa() {
        const res= await this.loaders.CargarPuntosDigitacionHisMinsa(7)
        return res

    }


    @Get('cargas/maestropaciente')
    async CargarMaestrosPaciente() {
        const res= await this.loaders.cargarMaestroPacienteTodosPuntosDigitacion()
        return res

    }
    
    @Get('listar_puntos')
    async ListarPuntosDigitacion() {
        let res:any[]= await this.loaders.CargarPuntosDigitacionHisMinsa(7)
        return {cantidad:res.length}

    }

    @Get('cargar_padron_nominal')
    async cargar_padron_nominal() {
     await this.loaders.cargarPadronNominalRegional()
        return 
    {}
    
    }

    @Get('peru')
    async cargar_padron_nominal_peru() {
     await this.loaders.cargarPacientesPeru()
        return 
    {}
    
    }

    @Get('u')
    async cambiarUser(){
      await  this.loaders.cambiarUsuario()
    }

    @Get('baja')
    async cambiarRegionUser(){
      await  this.loaders.darBaja()
    }

    
}
