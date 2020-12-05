import { Controller, Get } from '@nestjs/common';
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
}
