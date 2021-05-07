import { Controller, Get } from '@nestjs/common';
import { MaestroEstablecimientoService } from './maestro-establecimiento.service';

@Controller('establecimientos')
export class EstablecimientosController {
    constructor(private maestr: MaestroEstablecimientoService) {

    }
    @Get('listar')
    async listar() {
        const wai = await this.maestr.listarMaestroRep()

        return wai
    }
}
