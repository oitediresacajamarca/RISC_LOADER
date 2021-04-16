import { Controller, Get, Param } from '@nestjs/common';

@Controller('padron-nominal')
export class PadronNominalController {

    @Get('/:anio/:mes')
    DescargarPadron(@Param('anio') anio: string) {
        console.log(anio)
    }
}
