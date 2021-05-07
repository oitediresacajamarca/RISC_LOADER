import { Injectable } from '@nestjs/common';
import { Establecimientos } from './establecimientos.interface';
import { MaestroEstablecimientoRepository } from './maestro-establecimiento.repository';

@Injectable()
export class MaestroEstablecimientoService {
    constructor(private maestrorep: MaestroEstablecimientoRepository) {

    }

    async listarMaestroRep() {
        let est_list = await this.maestrorep.find({ Codigo_Disa: 7 })
        return est_list
    }
    async NuevoEstablec(establec: MaestroEstablecimientoRepository) {

        let nuevo = this.maestrorep.create()
        Object.assign(nuevo, establec)
      
        this.maestrorep.save(nuevo)

        return nuevo
    }

}
