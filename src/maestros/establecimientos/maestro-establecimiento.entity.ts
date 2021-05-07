import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('establecimiento')
export class MaestroEstablecimientoEntity {
    @PrimaryColumn()
    Id_Establecimiento: number;

    @Column()
    Nombre_Establecimiento: string;
    @Column()
    Ubigueo_Establecimiento: number;
    @Column()
    Codigo_Disa: number;
    @Column()
    Disa: string;
    @Column()
    Codigo_Red: string;
    @Column()
    Red: string;
    @Column()
    Codigo_MicroRed: string;
    @Column()
    MicroRed: string;
    @Column()
    Codigo_Unico: string;
    @Column()
    Codigo_Sector: number;
    @Column()
    Descripcion_Sector: string;

    @Column()
    Departamento: string;
    @Column()
    Provincia: string;
    @Column()
    Distrito: string;
}
