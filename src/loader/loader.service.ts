import { Injectable } from '@nestjs/common';
import { Console } from 'console';
import { MaestroEstablecimientoRepository } from 'src/maestros/establecimientos/maestro-establecimiento.repository';
import { PuntoDigitacionHisminsa } from './interfaces/punto-digitacion-hisminsa.interface';
const fs = require('fs')
const fetch = require('node-fetch');
const dot = require('dotenv').config()

@Injectable()
export class LoaderService {
    constructor(private disas: MaestroEstablecimientoRepository) { }

    RUTA_CARGAR = process.env.RUTA

    PROVINCIAS = [{ "ID_PROVINCIA": "0601", "ID_DEPARTAMENTO": "06", "NOMBRE": "CAJAMARCA" }, { "ID_PROVINCIA": "0602", "ID_DEPARTAMENTO": "06", "NOMBRE": "CAJABAMBA" }, { "ID_PROVINCIA": "0603", "ID_DEPARTAMENTO": "06", "NOMBRE": "CELENDIN" }, { "ID_PROVINCIA": "0604", "ID_DEPARTAMENTO": "06", "NOMBRE": "CHOTA" }, { "ID_PROVINCIA": "0605", "ID_DEPARTAMENTO": "06", "NOMBRE": "CONTUMAZA" }, { "ID_PROVINCIA": "0606", "ID_DEPARTAMENTO": "06", "NOMBRE": "CUTERVO" }, { "ID_PROVINCIA": "0607", "ID_DEPARTAMENTO": "06", "NOMBRE": "HUALGAYOC" }, { "ID_PROVINCIA": "0608", "ID_DEPARTAMENTO": "06", "NOMBRE": "JAEN" }, { "ID_PROVINCIA": "0609", "ID_DEPARTAMENTO": "06", "NOMBRE": "SAN IGNACIO" }, { "ID_PROVINCIA": "0610", "ID_DEPARTAMENTO": "06", "NOMBRE": "SAN MARCOS" }, { "ID_PROVINCIA": "0611", "ID_DEPARTAMENTO": "06", "NOMBRE": "SAN MIGUEL" }, { "ID_PROVINCIA": "0612", "ID_DEPARTAMENTO": "06", "NOMBRE": "SAN PABLO" }, { "ID_PROVINCIA": "0613", "ID_DEPARTAMENTO": "06", "NOMBRE": "SANTA CRUZ" }]
    async DescargarMaestropPersonalRegional() {


        let FECHAACTUAL = new Date()
        console.log(FECHAACTUAL.getFullYear() * 10000 + (FECHAACTUAL.getMonth() + 1) * 100 + FECHAACTUAL.getDate())
        const dest = fs.createWriteStream(this.RUTA_CARGAR + '/TMP_MAESTROS/MAESTRO_PERSONAL/PERSONAL.csv');
        await fetch("https://wsalud.minsa.gob.pe/reporteshis/his/ExportarMaestroPersonal.aspx?parametro=-7---20201123-20201123-", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                "pragma": "no-cache",
                "sec-fetch-dest": "iframe",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "_ga=GA1.3.2012850145.1568573608; __cfduid=d455db6626cff542e92e41f50bf3077e71604958158; rxVisitor=160614978022480QTP1BTGTM16K6GDP3DVQRV10K9KQJ1; ASP.NET_SessionId=3u501sxvyapiffxji0zdl0vb; dtSa=true%7CC%7C-1%7CIniciar%20sesi%C3%B3n%7C-%7C1606182091903%7C581538221_692%7Chttps%3A%2F%2Fwebsalud.minsa.gob.pe%2Fhisminsa%2F%7CHIS%20MINSA%7C1606182092071%7C; dtLatC=1; dtCookie=2$79OK0FHU0ITRLCHSNP9ID7MD870RN4I1|HISMINSA|1; dtPC=2$582094851_231h-vGPXVBWVUATWVVKWVQTBULHXMJGBWWCQJ; rxvt=1606187502013|1606185702013"
            },
            "referrer": "https://wsalud.minsa.gob.pe/reporteshis/his/ExportarMaestroPersonal.aspx?parametro=-7---20201123-20201123-",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKMTEwNzU3MTUxNA9kFgICAw9kFgQCAw8PFgIeBFRleHQFGVRvdGFsIGRlIHJlZ2lzdHJvcyAyMTIzNjdkZAIFDzwrABwCAA8WAh4PRGF0YVNvdXJjZUJvdW5kZ2QYPCsABgEFFCsAAmRkZBgBBR5fX0NvbnRyb2xzUmVxdWlyZVBvc3RCYWNrS2V5X18WAQUCZ3bgk6AD7lZirFin6Lgn1%2Bahp6Tjys4ZOVh%2BzZZ3gXfcqw%3D%3D&__VIEWSTATEGENERATOR=BA2067EA&__EVENTVALIDATION=%2FwEdAAtnhTxrV83YFSwqZtR3FGBM60z594LnSzU4S6PQAbT3rq%2FpNZX4WBzijQTqPezGz2cPw6yb2%2B8wFVL9OLFMP7J7pAiCeLToo4O3HlO4yQxlIfvcNFoQPNiM7bg%2FOngY3P4BkA6huflNnawEEAJHB5G4AuunurLj5OiQui6dRwAtUPWzZLxWMw9LZCkW1r1wQWtVmqd7cYVwF0CgV957j5RekmEIlqWRw%2Bgtywck79wWEKbr9Df%2FYNWfPFPvzN5oNQ0q52U5znqelSwrjB7eqvvX&btnExportar=Exportar+a+Excel&gv%24DXSelInput=&gv%24DXKVInput=%5B%5D&gv%24CallbackState=BwMHAgIERGF0YQZ8BgAAAACPPQMAjz0DAAAAAAAPAAAAAAcAAAALSWRfUGVyc29uYWwLSWRfUGVyc29uYWwHAAARSWRfVGlwb19Eb2N1bWVudG8RSWRfVGlwb19Eb2N1bWVudG8DAAAQTnVtZXJvX0RvY3VtZW50bxBOdW1lcm9fRG9jdW1lbnRvBwAAGUFwZWxsaWRvX1BhdGVybm9fUGVyc29uYWwZQXBlbGxpZG9fUGF0ZXJub19QZXJzb25hbAcAABlBcGVsbGlkb19NYXRlcm5vX1BlcnNvbmFsGUFwZWxsaWRvX01hdGVybm9fUGVyc29uYWwHAAAQTm9tYnJlc19QZXJzb25hbBBOb21icmVzX1BlcnNvbmFsBwAAEEZlY2hhX05hY2ltaWVudG8QRmVjaGFfTmFjaW1pZW50bwcAAAcAAAAMSWRfQ29uZGljaW9uDElkX1Byb2Zlc2lvbgpJZF9Db2xlZ2lvEk51bWVyb19Db2xlZ2lhdHVyYRJJZF9Fc3RhYmxlY2ltaWVudG8KRmVjaGFfQWx0YQpGZWNoYV9CYWphBwAHAAcABwAG%2F%2F8HAgwxMDAzMzg5MjQyMzgDBwEHAgg0Mzc5MzAyNAcCCUNBTExJUkdPUwcCBkVTUVVFTgcCEU1BUklUWkEgRUxJWkFCRVRIBwIKMTk4Ni0xMC0wMgcABwAG%2F%2F8HAgwxMDA2MzAwNjcxNDQDBwEHAgg3MDc4MDMxOQcCBVBFUkVaBwIGQ0FTVFJPBwIOTUlSRUlMQSBHSVNFTEEHAgoxOTkyLTA4LTIwBwAHAAb%2F%2FwcCDDEwMTE3MjMwNDIwNwMHAQcCCDI3NzQ5Mjk4BwIHU0FOQ0hFWgcCBVBFUkVaBwIPREVZU0kgREVMIFBJTEFSBwIKMTk3Ny0wMi0wNAcABwAG%2F%2F8HAgwxMDE1NjY5MDQyNjQDBwEHAgg0NjY2OTgxMQcCBkNBUlBJTwcCB0RFTEdBRE8HAg5MVUNJTEEgS0FURVJJTgcCCjE5OTAtMTEtMTIHAAcABv%2F%2FBwIMMTAxNjIzNTY0MjM1AwcBBwIINDA1NjY4NjYHAgdNRU5ET1pBBwIKQUxUQU1JUkFOTwcCBlpVTElUQQcCCjE5ODAtMDUtMjQHAAcABv%2F%2FBwIMMTAxNzkzOTM0MjM3AwcBBwIINDE5NzMxMzYHAgVBVVJJUwcCCUNPTlRSRVJBUwcCDEpFTk5ZIE1FTElOQQcCCjE5ODItMDktMTYHAAcABv%2F%2FBwINMTAxODE4NjgyMzUxOAMHAQcCCDczMDU0MTgyBwIJRkVSTkFOREVaBwIGWkFNT1JBBwIGQU5EUkVBBwIKMTk5NC0wNi0yMwcABwAG%2F%2F8HAgsxMDE4OTY1Njk5NAMHAQcCCDQ2MTE3NzExBwIERElBWgcCCUZFUk5BTkRFWgcCB1JPU0FSSU8HAgoxOTc4LTEwLTAxBwAHAAb%2F%2FwcCDDEwMjI4NzU4NTAzNwMHAQcCCDI1NzM0MTE1BwIGR0VSTUFOBwIHU0FMQVpBUgcCDUNBVEFMSU5BIE9MR0EHAgoxOTY0LTAxLTIzBwAHAAb%2F%2FwcCCzEwMjMyMjU2ODQxAwcBBwIINDYwODYwMDgHAgdHVUVWQVJBBwIFUk9KQVMHAgVOT0VNSQcCCjE5ODktMDktMjcHAAcABv%2F%2FBwILMTAyMzY2OTQyMTgDBwEHAgg0MjMyNjU2MwcCBlNFR1VSQQcCBlJPTUVSTwcCC05PTlkgSVNBQkVMBwIKMTk4NC0wMi0yNQcABwAG%2F%2F8HAgsxMDI0NzUyNDIxMAMHAQcCCDQ0MzQ2NDI0BwIIRVNDQVJBVEUHAghHVUVSUkVSTwcCDUNJTkRZIENFQ0lMSUEHAgoxOTg3LTAyLTAzBwAHAAb%2F%2FwcCDDEwMjgxMTE3NDgxNQMHAQcCCDcyNDg2Mjc5BwIHUEFESUxMQQcCBFNVWEUHAhBCRU5JVEEgT1JNRUNJTkRBBwIKMTk5Mi0wNC0xMQcABwAG%2F%2F8HAgwxMDMyMzYxMDQ2MTgDBwEHAgg0MjQwNDMyNAcCBlNFQ0xFTgcCB0hJREFMR08HAg5EQU5JRUwgRURVQVJETwcCCjE5ODQtMDYtMTQHAAcABv%2F%2FBwIMMTAzMjc1ODQ0MjQ4AwcBBwIINDA0NTEzOTQHAglET01JTkdVRVoHAgVCRVJSVQcCDEFSQ0VMWSBOT0VNSQcCCjE5ODAtMDMtMDUCBVN0YXRlB1MHCAcAAgEHAQIBBwICAQcDAgEHBAIBBwUCAQcGAgEHBwIBBwAHAAcABwACAAUAAACACQIABwAJAgACAAMHBAIABwACAQWPPQMABwACAQcABwAHAAIIUGFnZVNpemUDBw8%3D&hdidsector=&hdiddisa=7&hdidred=&hdidmicrored=&hdidestablecimiento=&hdidpunto=&hdfecini=" + FECHAACTUAL + "&hdfecfin=" + FECHAACTUAL + "&DXScript=1_171%2C1_94%2C1_164%2C1_104%2C1_138%2C1_114%2C1_121%2C1_152&DXCss=0_3598%2C0_3741%2C1_12%2C0_3600%2C0_3745%2C0_3592%2C1_5%2C0_3594",
            "method": "POST",
            "mode": "cors"
        }).then(res => {
            console.log('inicio')
            console.log(res)
            res.body.pipe(dest);
            console.log('termino')

        });;


    }
    DesacargarMaestroRegistradorRegional() {
        console.log(this.RUTA_CARGAR)

        let FECHAACTUAL = new Date()
        console.log(FECHAACTUAL.getFullYear() * 10000 + (FECHAACTUAL.getMonth() + 1) * 100 + FECHAACTUAL.getDate())
        const dest = fs.createWriteStream(this.RUTA_CARGAR + '/TMP_MAESTROS/MAESTRO_REGISTRADOR/MAESTRO_REGISTRADOR.csv');
        fetch("https://wsalud.minsa.gob.pe/reporteshis/his/ExportarMaestroRegistrador.aspx?parametro=-7---20201205-20201205-", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                "pragma": "no-cache",
                "sec-fetch-dest": "iframe",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "_ga=GA1.3.2012850145.1568573608; __cfduid=d455db6626cff542e92e41f50bf3077e71604958158; ASP.NET_SessionId=lypr1jmssc5jdsqpuvwzljt5"
            },
            "referrer": "https://wsalud.minsa.gob.pe/reporteshis/his/ExportarMaestroRegistrador.aspx?parametro=-7---20201205-20201205-",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKMTEwNzU3MTUxNA9kFgICAw9kFgQCAw8PFgIeBFRleHQFGFRvdGFsIGRlIHJlZ2lzdHJvcyAxMzMxMmRkAgUPPCsAHAIADxYCHg9EYXRhU291cmNlQm91bmRnZBg8KwAGAQUUKwACZGRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQJndtfmdESoyUuJXSGLjBEOt8%2BoKm%2BT2fCtaGkx7YCjnD%2BI&__VIEWSTATEGENERATOR=C7FAB5EA&__EVENTVALIDATION=%2FwEdAAsEnHfIl7H4gpQXRErvWTHD60z594LnSzU4S6PQAbT3rq%2FpNZX4WBzijQTqPezGz2cPw6yb2%2B8wFVL9OLFMP7J7pAiCeLToo4O3HlO4yQxlIfvcNFoQPNiM7bg%2FOngY3P4BkA6huflNnawEEAJHB5G4AuunurLj5OiQui6dRwAtUPWzZLxWMw9LZCkW1r1wQWtVmqd7cYVwF0CgV957j5RekmEIlqWRw%2Bgtywck79wWELdk8%2FhKCfr1fKNtPbqe0OJNpUy6fn%2FetSNhWGaoCE0G&btnExportar=Exportar+a+Excel&gv%24DXSelInput=&gv%24DXKVInput=%5B%5D&gv%24CallbackState=BwMHAgIERGF0YQagBQAAAAAANAAAADQAAAAAAAAPAAAAAAcAAAAOSWRfUmVnaXN0cmFkb3IOSWRfUmVnaXN0cmFkb3IDAAARSWRfVGlwb19Eb2N1bWVudG8RSWRfVGlwb19Eb2N1bWVudG8DAAAQTnVtZXJvX0RvY3VtZW50bxBOdW1lcm9fRG9jdW1lbnRvBwAAHEFwZWxsaWRvX1BhdGVybm9fUmVnaXN0cmFkb3IcQXBlbGxpZG9fUGF0ZXJub19SZWdpc3RyYWRvcgcAABxBcGVsbGlkb19NYXRlcm5vX1JlZ2lzdHJhZG9yHEFwZWxsaWRvX01hdGVybm9fUmVnaXN0cmFkb3IHAAATTm9tYnJlc19SZWdpc3RyYWRvchNOb21icmVzX1JlZ2lzdHJhZG9yBwAAEEZlY2hhX05hY2ltaWVudG8QRmVjaGFfTmFjaW1pZW50bwcAAAAAAAAHAAcABwAHAAb%2F%2FwMGQBoDBwEHAgg0NTYxMzM3MgcCBkZMT1JFUwcCB1NBTEFaQVIHAghDQVJPTElOQQcCCjE5ODktMDEtMjYHAAcABv%2F%2FAwaoPAMHAQcCCDE2NzA4MTEyBwIJQ0VOVFVSSU9OBwIIQ09ST05BRE8HAg9ST0JFUlQgQlJJVEFMRE8HAgoxOTcxLTAxLTEyBwAHAAb%2F%2FwMG0kEDBwEHAgg0NDE5NTg4NQcCBkNISUxPTgcCBVJPSkFTBwIPTEFWRUlEWSBNRUxJU1NBBwIKMTk4Ny0wMS0yMQcABwAG%2F%2F8DBqZPAwcBBwIINDA3MDAyOTQHAgdWQVNRVUVaBwIITUFSVElORVoHAgxKQVZJRVIgT1lNRVIHAgoxOTgwLTA4LTI5BwAHAAb%2F%2FwMGD1oDBwEHAgg0NzgyMDMzNgcCBERJQVoHAgRESUFaBwIQQ1JJU1RJQU4gQUxGT05TTwcCCjE5ODktMDMtMDMHAAcABv%2F%2FAwWUOAEAAwcBBwIINDQ5NzU5MzUHAgZSSU9KQVMHAghDQVJSQU5aQQcCD0pFTklGRkVSIExPUkVOQQcCCjE5ODctMDUtMjgHAAcABv%2F%2FAwVhpQEAAwcBBwIINDA4OTgwMTEHAgVMT1BFWgcCCFNBTFZBRE9SBwIEQkFOSQcCCjE5ODEtMDMtMjEHAAcABv%2F%2FAwVGDQIAAwcBBwIINDY1NjI5MDAHAgZDSEFWRVoHAgdWQVNRVUVaBwILTFVaIEFNRVJJQ0EHAgoxOTg5LTA4LTAxBwAHAAb%2F%2FwMFaCMCAAMHAQcCCDA4ODY0OTAwBwIKVkFMRU5aVUVMQQcCBVRBUElBBwIGV0FMVEVSBwIKMTk1OS0wMS0xMgcABwAG%2F%2F8DBWHrAwADBwEHAgg3MTg5Njk1NwcCCVJPRFJJR1VFWgcCCkNBREVOSUxMQVMHAgVERUlTSQcCCjE5OTEtMTAtMTEHAAcABv%2F%2FAwXRDQUAAwcBBwIINDc2Mzg0OTMHAgdDT1JET1ZBBwIGVE9SUkVTBwIMSVNTQSBKSEFOSU5BBwIKMTk5MS0wOC0yOQcABwAG%2F%2F8DBcETBQADBwEHAgg0MTcxODIxNQcCBFRPUk8HAgZPQkFORE8HAhFBWlVDRU5BIFlBUVVFTElORQcCCjE5ODMtMDEtMDEHAAcABv%2F%2FAwU0IAUAAwcBBwIINDEyODU3NjEHAgdCUklOR0FTBwIHR1VJTExFTgcCDUtBUklOQSBZQU5FVEgHAgoxOTgyLTAyLTE1BwAHAAb%2F%2FwMFCiEFAAMHAQcCCDQyMzQ2MDYzBwIDUEFaBwIIQ0FSUklMTE8HAgtKQU1FUyBQQU9MSQcCCjE5ODQtMDMtMjAHAAcABv%2F%2FAwXTIwUAAwcBBwIINDA1MjI5OTEHAgZBQkFOVE8HAgdBTENBTERFBwIMUk9YQU5BIEpBTkVUBwIKMTk4MC0wMy0xNAIFU3RhdGUHUQcIBwACAQcBAgEHAgIBBwMCAQcEAgEHBQIBBwYCAQcHAgEHAAcABwAHAAIABQAAAIAJAgAHAAkCAAIAAwcEAgAHAAIBBgA0BwACAQcABwAHAAIIUGFnZVNpemUDBw8%3D&hdidsector=&hdiddisa=7&hdidred=&hdidmicrored=&hdidestablecimiento=&hdidpunto=&hdfecini=" + FECHAACTUAL + "&hdfecfin=" + FECHAACTUAL + "&DXScript=1_171%2C1_94%2C1_164%2C1_104%2C1_138%2C1_114%2C1_121%2C1_152&DXCss=0_3598%2C0_3741%2C1_12%2C0_3600%2C0_3745%2C0_3592%2C1_5%2C0_3594",
            "method": "POST",
            "mode": "cors"
        }).then(async res => {
            console.log('inicio')
            console.log(res)
            await res.body.pipe(dest);
            console.log('termino')

        });;

    }



    async DescargarReportePlano(mes: number, anio: number, sector: number) {

        const rpt = fs.createWriteStream(this.RUTA_CARGAR + '/TMP_REPORTES_PLANOS/TMP_REPORTES_PLANOS/REPORTE_PLANO_' + mes + '_' + anio + '_' + sector + '.csv');

        let FECHA_INICIO_PERIODO = new Date()

        FECHA_INICIO_PERIODO.setUTCDate(1)
        FECHA_INICIO_PERIODO.setUTCMonth(mes - 1)
        FECHA_INICIO_PERIODO.setUTCFullYear(anio)


        let FECHA_FIN_PERIODO = new Date(FECHA_INICIO_PERIODO.getFullYear(), FECHA_INICIO_PERIODO.getMonth() + 1, 0)





        let FECHA_INICIO_PERIODO_FORMAT = FECHA_INICIO_PERIODO.getUTCFullYear() * 10000 + (FECHA_INICIO_PERIODO.getUTCMonth() + 1) * 100 + FECHA_INICIO_PERIODO.getUTCDate()
        let FECHA_FIN_PERIODO_FORMAT = FECHA_FIN_PERIODO.getUTCFullYear() * 10000 + (FECHA_FIN_PERIODO.getUTCMonth() + 1) * 100 + FECHA_FIN_PERIODO.getUTCDate()

        FECHA_FIN_PERIODO.setUTCFullYear(anio)

        if (mes == (new Date()).getMonth() + 1 && anio == (new Date()).getFullYear()) {


            FECHA_FIN_PERIODO = new Date()
            FECHA_FIN_PERIODO.setUTCDate(FECHA_FIN_PERIODO.getUTCDate() - 1)

            let FECHA_INICIO_PERIODO_FORMAT = FECHA_INICIO_PERIODO.getUTCFullYear() * 10000 + (FECHA_INICIO_PERIODO.getUTCMonth() + 1) * 100 + FECHA_INICIO_PERIODO.getUTCDate()
            let FECHA_FIN_PERIODO_FORMAT = FECHA_FIN_PERIODO.getUTCFullYear() * 10000 + (FECHA_FIN_PERIODO.getUTCMonth() + 1) * 100 + FECHA_FIN_PERIODO.getUTCDate()

        }

        console.log(FECHA_INICIO_PERIODO_FORMAT + '-' + FECHA_FIN_PERIODO_FORMAT)

            ;


        let resp = await fetch("https://wsalud.minsa.gob.pe/reporteshis/his/NominalTramaNuevo.aspx?parametro=7-7-----20210101-20210131", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                "pragma": "no-cache",
                "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"90\", \"Google Chrome\";v=\"90\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "iframe",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "_ga_F4HY3YK7EH=GS1.1.1613481795.4.0.1613481795.0; _ga_LEDF527D3S=GS1.1.1615149485.2.0.1615149485.0; _ga_NWVQ3HSJKS=GS1.1.1616246531.42.0.1616246531.0; _ga_T513LTCYK1=GS1.1.1619054927.32.0.1619054927.0; _ga=GA1.3.1150659243.1611596987; __cfduid=d7241dd5a0233ce70e4ca2357878e69711619366672; dtCookie=3$A84C7F0F9779E61CFC681EDF0C9B2D66; ASP.NET_SessionId=f513iahkbz3akldhcoxef03k"
            },
            "referrer": "https://wsalud.minsa.gob.pe/reporteshis/his/NominalTramaNuevo.aspx?parametro=7-7-----20210101-20210131",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwULLTEwMTQzMzA4NTAPZBYCAgMPZBYEAgMPDxYCHgRUZXh0BRpUb3RhbCBkZSByZWdpc3Ryb3MgMTQ2NjYyMmRkAgUPPCsAHAIADxYCHg9EYXRhU291cmNlQm91bmRnZBg8KwAGAQUUKwACZGRkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYBBQJndqNQ0w%2B2S6ehf4ODjHMqXSGfx%2BX6j7o9%2FziIiFqBiBzl&__VIEWSTATEGENERATOR=40BBBC33&__EVENTVALIDATION=%2FwEdAAsfT4AfBli1pZCN%2B3URMrLj60z594LnSzU4S6PQAbT3rq%2FpNZX4WBzijQTqPezGz2dA7gw86B%2By7ZHTN%2BvyabRRNnYkKrbN%2FO3%2F80cAQIl6hUr4E8rNR8j1g%2BULBBtNNPuHCckrAtLUuxosmebAadYwj4xXkHQ%2BYn1IHjIKmCBZQcd656%2BJOgSd%2B0%2FH49X4pDTceTYcQ5kHq6daWfdlKKqcYwT%2BSUyhF5e0clSSWBJgLoeYJBsuo84tP6tqIidDPW7uwSQpCtC8RwwZdny2m99L&btnExportar=Exportar+a+Excel&gv%24DXSelInput=&gv%24DXKVInput=%5B%5D&gv%24CallbackState=BwMHAgIERGF0YQbRCAAAAAD%2BYBYA%2FmAWAAAAAAAPAAAAAA8AAAAHSWRfQ2l0YQdJZF9DaXRhAwAABEFuaW8EQW5pbwMAAANNZXMDTWVzAwAAA0RpYQNEaWEDAAAORmVjaGFfQXRlbmNpb24ORmVjaGFfQXRlbmNpb24HAAAETG90ZQRMb3RlBwAAB051bV9QYWcHTnVtX1BhZwMAAAdOdW1fUmVnB051bV9SZWcDAAASSWRfRXN0YWJsZWNpbWllbnRvEklkX0VzdGFibGVjaW1pZW50bwMAAAtJZF9QYWNpZW50ZQtJZF9QYWNpZW50ZQcAAAtJZF9QZXJzb25hbAtJZF9QZXJzb25hbAcAAA5JZF9SZWdpc3RyYWRvcg5JZF9SZWdpc3RyYWRvcgMAAAtDb2RpZ29fSXRlbQtDb2RpZ29fSXRlbQcAABBUaXBvX0RpYWdub3N0aWNvEFRpcG9fRGlhZ25vc3RpY28HAAAJVmFsb3JfTGFiCVZhbG9yX0xhYgcAABkAAAAGSWRfVXBzDklkX0ZpbmFuY2lhZG9yHElkX0NvbmRpY2lvbl9Fc3RhYmxlY2ltaWVudG8VSWRfQ29uZGljaW9uX1NlcnZpY2lvCEVkYWRfUmVnCVRpcG9fRWRhZBRBbmlvX0FjdHVhbF9QYWNpZW50ZRNNZXNfQWN0dWFsX1BhY2llbnRlE0RpYV9BY3R1YWxfUGFjaWVudGUISWRfVHVybm8OSWRfQ29ycmVsYXRpdm8SSWRfQ29ycmVsYXRpdm9fTGFiBFBlc28FVGFsbGELSGVtb2dsb2JpbmETUGVyaW1ldHJvX0FiZG9taW5hbBJQZXJpbWV0cm9fQ2VmYWxpY28RSWRfT3RyYV9Db25kaWNpb24RSWRfQ2VudHJvX1BvYmxhZG8SRmVjaGFfVWx0aW1hX1JlZ2xhEkZlY2hhX1NvbGljaXR1ZF9IYhJGZWNoYV9SZXN1bHRhZG9fSGIORmVjaGFfUmVnaXN0cm8SRmVjaGFfTW9kaWZpY2FjaW9uB0lkX1BhaXMHAAcABwAHAAb%2F%2FwMFW2zFGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIDQUNUAwcHAwcBAwaJEQcCDDQ0NDMxOTk4NDQ4OQcCCjQ2MTg3NjQ0ODkDBdKjPAAHAgU5MDY4MQcCAUQHAgExBwAHAAb%2F%2FwMFW2zFGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIDQUNUAwcHAwcBAwaJEQcCDDQ0NDMxOTk4NDQ4OQcCCjQ2MTg3NjQ0ODkDBdKjPAAHAgU5MDcxMwcCAUQHAgExBwAHAAb%2F%2FwMFW2zFGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIDQUNUAwcHAwcBAwaJEQcCDDQ0NDMxOTk4NDQ4OQcCCjQ2MTg3NjQ0ODkDBdKjPAAHAgU5MDcyMwcCAUQHAgExBwAHAAb%2F%2FwMFW2zFGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIDQUNUAwcHAwcBAwaJEQcCDDQ0NDMxOTk4NDQ4OQcCCjQ2MTg3NjQ0ODkDBdKjPAAHAgU5MDY3MAcCAUQHAgExBwAHAAb%2F%2FwMFWoKKGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIBMwMHAQMHAwMGuxoHAgsyMzc5MjYxNjg0MwcCCzYzNDQ4MjY2ODQzAwbkPAcCBFowMDEHAgFEDAcABwAG%2F%2F8DBVqCihoDBuUHAwcBAwcBBwIKMjAyMS0wMS0wMQcCATMDBwEDBwMDBrsaBwILMjM3OTI2MTY4NDMHAgs2MzQ0ODI2Njg0MwMG5DwHAgU5OTM4MwcCAUQHAgExBwAHAAb%2F%2FwMFWoKKGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIBMwMHAQMHAwMGuxoHAgsyMzc5MjYxNjg0MwcCCzYzNDQ4MjY2ODQzAwbkPAcCBTk2MTEwBwIBRAwHAAcABv%2F%2FAwVagooaAwblBwMHAQMHAQcCCjIwMjEtMDEtMDEHAgEzAwcBAwcDAwa7GgcCCzIzNzkyNjE2ODQzBwILNjM0NDgyNjY4NDMDBuQ8BwIFODUwMTgHAgFEBwIBMQcABwAG%2F%2F8DBVqCihoDBuUHAwcBAwcBBwIKMjAyMS0wMS0wMQcCATMDBwEDBwMDBrsaBwILMjM3OTI2MTY4NDMHAgs2MzQ0ODI2Njg0MwMG5DwHAgU5OTQwMwcCAUQHAgExBwAHAAb%2F%2FwMFWoKKGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIBMwMHAQMHAwMGuxoHAgsyMzc5MjYxNjg0MwcCCzYzNDQ4MjY2ODQzAwbkPAcCBTk2MTUwBwIBRAcCA1ZJRgcABwAG%2F%2F8DBVqCihoDBuUHAwcBAwcBBwIKMjAyMS0wMS0wMQcCATMDBwEDBwMDBrsaBwILMjM3OTI2MTY4NDMHAgs2MzQ0ODI2Njg0MwMG5DwHAgg5OTQwMi4wOQcCAUQMBwAHAAb%2F%2FwMFWoKKGgMG5QcDBwEDBwEHAgoyMDIxLTAxLTAxBwIBMwMHAQMHAwMGuxoHAgsyMzc5MjYxNjg0MwcCCzYzNDQ4MjY2ODQzAwbkPAcCCDg3MTc3LjAxBwIBUAwHAAcABv%2F%2FAwVagooaAwblBwMHAQMHAQcCCjIwMjEtMDEtMDEHAgEzAwcBAwcDAwa7GgcCCzIzNzkyNjE2ODQzBwILNjM0NDgyNjY4NDMDBuQ8BwIFODcxNzgHAgFQDAcABwAG%2F%2F8DBVqCihoDBuUHAwcBAwcBBwIKMjAyMS0wMS0wMQcCATMDBwEDBwMDBrsaBwILMjM3OTI2MTY4NDMHAgs2MzQ0ODI2Njg0MwMG5DwHAgRaMDEwBwIBRAcCAU4HAAcABv%2F%2FAwVagooaAwblBwMHAQMHAQcCCjIwMjEtMDEtMDEHAgEzAwcBAwcDAwa7GgcCCzIzNzkyNjE2ODQzBwILNjM0NDgyNjY4NDMDBuQ8BwIFOTkxNzMHAgFEBwICMjACBVN0YXRlB3MHEAcAAgEHAQIBBwICAQcDAgEHBAIBBwUCAQcGAgEHBwIBBwgCAQcJAgEHCgIBBwsCAQcMAgEHDQIBBw4CAQcPAgEHAAcABwAHAAIABQAAAIAJAgAHAAkCAAIAAwcEAgAHAAIBBf5gFgAHAAIBBwAHAAcAAghQYWdlU2l6ZQMHDw%3D%3D&hdpidsector=7&hdpiddisa=7&hdpidred=&hdpidmicrored=&hdpidestablecimiento=&hdpidpunto=&hdpfecini="+FECHA_INICIO_PERIODO_FORMAT+"&hdpfecfin="+FECHA_FIN_PERIODO_FORMAT+"&DXScript=1_171%2C1_94%2C1_164%2C1_104%2C1_138%2C1_114%2C1_121%2C1_152&DXCss=0_3598%2C0_3741%2C1_12%2C0_3600%2C0_3745%2C0_3592%2C1_5%2C0_3594",
            "method": "POST",
            "mode": "cors"
        });

        resp.body.on('data', (chunk) => {

        })

        await resp.body.pipe(rpt)

        return 'hi'

    }

    async CargarPuntosDigitacionHisMinsa(disa) {


        let resulta = await fetch("https://websalud.minsa.gob.pe/hisminsa/his/establecimiento?_dc=1606182256611&seccodigo=&idmicrored=&idred=&C=TIPOESTABLECIMIENTO&S=PUNTODIGITACIONGETLIST&iddisa=" + disa + "&idflag=SP&page=1&start=0&limit=100000", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "JSESSIONID=FDAD1823837A6BE5C75B6E5ABEB6CCDB; _ga=GA1.3.2012850145.1568573608; __cfduid=d455db6626cff542e92e41f50bf3077e71604958158; rxVisitor=160614978022480QTP1BTGTM16K6GDP3DVQRV10K9KQJ1; byt=4026e19faf33ddc14db0551d41a41a2b6c89c39fc4313aa2e5b036f65b8aac2d96865f172f10b65eaca5d51c0008664f075a8f6e11cdc6b9a36e717aabec36cbcca69b6b52bd1a9e3897a65dbc5d02d4; dtLatC=1; dtCookie=2$79OK0FHU0ITRLCHSNP9ID7MD870RN4I1|HISMINSA|1; dtSa=-; rxvt=1606192407430|1606187503017; dtPC=2$582094851_231h-vGPXVBWXSASWVXKWVQTBWJHWMJEBWWCQJ"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(async res => {
            console.log('inicio')
            const r = await res.json().then(body => {

                let puntos: any[] = body.items

                let result: any[] = puntos.filter((punto) => { return punto.codpunto == 1 })
                return result
            }


            )
            console.log('termino')

            return r;


        });
        return resulta

    }

    async cargarMaestroPacientePuntoDigitacion(punto: PuntoDigitacionHisminsa, anio, mes, disa) {


        const rpt = fs.createWriteStream(this.RUTA_CARGAR + '/TMP_MAESTROS/MAESTRO_PACIENTE/MAESTRO_PACIENTE' + '-' + disa + '-' + punto.idpunto + '-' + punto.seccodigo + '.csv');

        let FECHA_INICIO_PERIODO = new Date()

        FECHA_INICIO_PERIODO.setUTCDate(1)
        FECHA_INICIO_PERIODO.setUTCMonth(mes - 1)
        FECHA_INICIO_PERIODO.setUTCFullYear(anio)

        let FECHA_FIN_PERIODO = new Date()
        FECHA_FIN_PERIODO.setUTCMonth(FECHA_INICIO_PERIODO.getMonth() + 2)
        FECHA_FIN_PERIODO.setUTCDate(1)
        FECHA_FIN_PERIODO.setUTCDate(FECHA_FIN_PERIODO.getUTCDate() - 1)

        FECHA_FIN_PERIODO.setUTCFullYear(anio)

        let FECHA_INICIO_PERIODO_FORMAT = FECHA_INICIO_PERIODO.getUTCFullYear() * 10000 + (FECHA_INICIO_PERIODO.getUTCMonth() + 1) * 100 + FECHA_INICIO_PERIODO.getUTCDate()
        let FECHA_FIN_PERIODO_FORMAT = FECHA_FIN_PERIODO.getUTCFullYear() * 10000 + (FECHA_FIN_PERIODO.getUTCMonth() + 1) * 100 + FECHA_FIN_PERIODO.getUTCDate()


        let resulta = await fetch("https://wsalud.minsa.gob.pe/reporteshis/his/ExportarMaestroPaciente.aspx?parametro=7758-7-08-01-20201205-20201205-", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded",
                "pragma": "no-cache",
                "sec-fetch-dest": "iframe",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "_ga=GA1.3.2012850145.1568573608; __cfduid=d455db6626cff542e92e41f50bf3077e71604958158; _gid=GA1.3.1227218019.1606864475; ASP.NET_SessionId=xfp0rxbvtbp4xrocnxrt1srw; dtCookie=1$B90C79319B070E46E827C530AFF11782"
            },
            "referrer": "https://wsalud.minsa.gob.pe/reporteshis/his/ExportarMaestroPaciente.aspx?parametro=7758-7-08-01-20201205-20201205-",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUKMTEwNzU3MTUxNA9kFgICAw9kFgQCAw8PFgIeBFRleHQFF1RvdGFsIGRlIHJlZ2lzdHJvcyA0OTkzZGQCBQ88KwAcAgAPFgIeD0RhdGFTb3VyY2VCb3VuZGdkGDwrAAYBBRQrAAJkZGQYAQUeX19Db250cm9sc1JlcXVpcmVQb3N0QmFja0tleV9fFgEFAmd2iJufK0NgBezn2Dga24mu6HQzCbzBQEQ5XUD%2FVpBvY84%3D&__VIEWSTATEGENERATOR=7CA80B8B&__EVENTVALIDATION=%2FwEdAAvubQSx7mcCTYaQAFLza2SU60z594LnSzU4S6PQAbT3rq%2FpNZX4WBzijQTqPezGz2cPw6yb2%2B8wFVL9OLFMP7J7pAiCeLToo4O3HlO4yQxlIfvcNFoQPNiM7bg%2FOngY3P4BkA6huflNnawEEAJHB5G4AuunurLj5OiQui6dRwAtUPWzZLxWMw9LZCkW1r1wQWtVmqd7cYVwF0CgV957j5RekmEIlqWRw%2Bgtywck79wWEDF%2B4ggwqJbDsa9Oevl7hztTsk1VmDrTa%2FN06pwC625q&btnExportar=Exportar+a+Excel&gv%24DXSelInput=&gv%24DXKVInput=%5B%5D&gv%24CallbackState=BwMHAgIERGF0YQbHBgAAAACBEwAAgRMAAAAAAAAPAAAAAAcAAAALSWRfUGFjaWVudGULSWRfUGFjaWVudGUHAAARSWRfVGlwb19Eb2N1bWVudG8RSWRfVGlwb19Eb2N1bWVudG8DAAAQTnVtZXJvX0RvY3VtZW50bxBOdW1lcm9fRG9jdW1lbnRvBwAAGUFwZWxsaWRvX1BhdGVybm9fUGFjaWVudGUZQXBlbGxpZG9fUGF0ZXJub19QYWNpZW50ZQcAABlBcGVsbGlkb19NYXRlcm5vX1BhY2llbnRlGUFwZWxsaWRvX01hdGVybm9fUGFjaWVudGUHAAAQTm9tYnJlc19QYWNpZW50ZRBOb21icmVzX1BhY2llbnRlBwAAEEZlY2hhX05hY2ltaWVudG8QRmVjaGFfTmFjaW1pZW50bwcAAA4AAAAGR2VuZXJvCElkX0V0bmlhEEhpc3RvcmlhX0NsaW5pY2EORmljaGFfRmFtaWxpYXIRVWJpZ2VvX05hY2ltaWVudG8NVWJpZ2VvX1JlbmllYxBEb21pY2lsaW9fUmVuaWVjEFViaWdlb19EZWNsYXJhZG8TRG9taWNpbGlvX0RlY2xhcmFkbxRSZWZlcmVuY2lhX0RvbWljaWxpbwdJZF9QYWlzEklkX0VzdGFibGVjaW1pZW50bwpGZWNoYV9BbHRhEkZlY2hhX01vZGlmaWNhY2lvbgcABwAHAAcABv%2F%2FBwIMMTAxNTk2MTY0NTM5AwcBBwIINzY3NDg2MDQHAgRKQVJBBwIEVkVSQQcCCUxVWiBFTEVOQQcCCjE5OTctMDEtMTgHAAcABv%2F%2FBwIMMTAzNTIyMjE0NTM5AwcBBwIIMjcxNTQzNjAHAgZEVVJBTkQHAgZHQVJDSUEHAgdBTEZPTlNPBwIKMTk0My0wOC0xMAcABwAG%2F%2F8HAgwxMDM3MTU3NjQ1MzgDBwEHAgg3OTY4ODU4NgcCBlFVSVNQRQcCCFZJTExFR0FTBwILWU9NQVIgWkFISVIHAgoyMDE2LTA1LTI5BwAHAAb%2F%2FwcCDDEwMzkwNTgzNDU0MAMHAQcCCDI3OTgxMzg4BwIGTU9MSU5BBwIHU0FOQ0hFWgcCBExVSVMHAgoxOTI4LTA4LTI1BwAHAAb%2F%2FwcCDDEwMzkwODg1NDU0MAMHAQcCCDQ3MTA5ODE2BwIGUVVJU1BFBwIJRkVSTkFOREVaBwIHVEVPTklMQQcCCjE5NDktMDUtMTkHAAcABv%2F%2FBwIMMTEwMTk3Njk0NTM5AwcBBwIIMTkyMDcyMDYHAgZSSVZFUkEHAgVDRVJOQQcCBUVMSUFTBwIKMTk0My0wNy0yMwcABwAG%2F%2F8HAgwxMTAxOTg1MzQ1MzkDBwEHAgg0MDY1MjY1OAcCB0hVQUNDSEEHAgdNSU5DSEFOBwIOTUFSSUEgVklDVE9SSUEHAgoxOTcwLTAzLTEwBwAHAAb%2F%2FwcCCzEzNDQ2Njg0NTM4AwcBBwIIMjgwNjgxMzYHAgpNT05URU5FR1JPBwIFU0FNQU4HAg5NQVJJQSBESU9OSVNJQQcCCjE5NDctMDMtMjQHAAcABv%2F%2FBwILMTQ0MjE5MDQ1MzgDBwEHAgg4MTAzNjM3OAcCBVlOR09MBwIETEVPTgcCC0FNWSBCUklHSElUBwIKMjAxNC0wOC0wNwcABwAG%2F%2F8HAgwxNjA4MTk5NDQ1MzkDBwEHAggxODE1NDkwNwcCClZBTERJVklFU08HAgZCTEFOQ08HAgxFU1RIRVIgTk9FTUkHAgoxOTc1LTA2LTI2BwAHAAb%2F%2FwcCDDE2MjQxMDI4NDUzOQMHAQcCCDE5MjYyOTE4BwIGUk9NRVJPBwIGUklWRVJBBwIQTUFOVUVMIEZFTElDSUFOTwcCCjE5MzEtMDItMjgHAAcABv%2F%2FBwIMMTYyNTM0Mzc0NTM3AwcBBwIIMTkzMjAyOTIHAgVDVUJBUwcCB1NBTkNIRVoHAgpMVVogQVVST1JBBwIKMTk0Mi0wNS0xNAcABwAG%2F%2F8HAgwxNjI3MDQ2MjQ1NDADBwEHAggxOTE5NzE4OAcCBkVTVEVMQQcCB01VUklMTE8HAgtQRURSTyBQQUJMTwcCCjE5NDQtMDMtMjkHAAcABv%2F%2FBwIMMTYyODMwODQ0NTM5AwcBBwIIMTkyMDEyNTgHAgdTRVJSQU5PBwIFU09MSVMHAgdBTEFNSVJPBwIKMTk2My0wNS0yOQcABwAG%2F%2F8HAgwxNjQwNzEyOTQ1MzcDBwEHAggxOTIwNzQzMgcCCEVTUElOT1pBBwIFQ1VCQVMHAghDTEVNRU5URQcCCjE5NjItMTEtMjACBVN0YXRlB1EHCAcAAgEHAQIBBwICAQcDAgEHBAIBBwUCAQcGAgEHBwIBBwAHAAcABwACAAUAAACACQIABwAJAgACAAMHBAIABwACAQaBEwcAAgEHAAcABwACCFBhZ2VTaXplAwcP&hdidsector=" + punto.seccodigo + "&hdiddisa=" + disa + "&hdidred=" + punto.codred + "&hdidmicrored=" + punto.codmicrored + "&hdidestablecimiento=&hdidpunto=" + punto.idpunto + "&hdfecini="+FECHA_INICIO_PERIODO_FORMAT+"&hdfecfin="+FECHA_FIN_PERIODO_FORMAT+"&DXScript=1_171%2C1_94%2C1_164%2C1_104%2C1_138%2C1_114%2C1_121%2C1_152&DXCss=0_3598%2C0_3741%2C1_12%2C0_3600%2C0_3745%2C0_3592%2C1_5%2C0_3594",
            "method": "POST",
            "mode": "cors"
        }).then(async res => {
            console.log('inicio')

            await res.body.pipe(rpt);
            console.log('termino')
            return 1

        })

        return resulta


    }

    async cargarMaestroPacienteTodosPuntosDigitacion() {


        let puntos: PuntoDigitacionHisminsa[] = await this.CargarPuntosDigitacionHisMinsa(7)

        puntos.map(async (punto) => {

            await this.cargarMaestroPacientePuntoDigitacion(punto, 2021, 5, 7)


        })



    }


    async cargarPadronNominalRegional() {

        this.PROVINCIAS.map(async (prov) => {

            await this.cargarPadronNominalProvincia(prov.ID_PROVINCIA, prov.NOMBRE)


        })
    }

    async cargarPadronNominalProvincia(cod_prov: string, nombre_prov: string) {



        const rpt = fs.createWriteStream('E:/DIRESA/Nominales/9MAYO2021/OBSERVADOS/' + nombre_prov + '.xlsx');
        console.log(cod_prov)

        let url = "https://padronnominal.reniec.gob.pe/padronn/reporte/padron_edad_xls.do?coUbigeo=" + cod_prov + "&deEdad=0&hastaEdad=5&deUbigeo=CAJAMARCA," + nombre_prov + "&feIni=01/01/2013&feFin=30/04/2021&tiRegFecha=T&esPadron=2"
        console.log(url)
        fetch(url, {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "JSESSIONID=m-9T0bKTtBcIy0Ub26GD7ny0nJpLivFi592jagiURKtYmkQgafFy!1331204936"
            },
            "referrer": "https://padronnominal.reniec.gob.pe/padronn/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
        }).then(res => {

            console.log(res);
            res.body.pipe(rpt);
            console.log('termino')
            return 1

        })




            ;
    }


    async cargarPacientesPeru() {

        let dis: any[] = [0, 23, 29, 15, 3, 32, 26, 35, 27, 21, 7, 1, 24, 18, 30, 4, 1, 25, 36, 13, 5, 22, 33, 2, 17, 34, 11, 28, 14, 8]
        dis.map(async (disa) => {

            let puntos: PuntoDigitacionHisminsa[] = await this.CargarPuntosDigitacionHisMinsa(disa)

            puntos.map((punto) => {

                this.cargarMaestroPacientePuntoDigitacion(punto, 2020, 1, disa)


            })



        })







    }

    cambiarUsuario() {

        fetch("https://websalud.minsa.gob.pe/hisminsa/security", {
            "headers": {
                "accept": "*/*",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": "https://websalud.minsa.gob.pe/hisminsa/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "C=USER&S=UPDATE&idpersonal=28652484&idpersona=28652484&idestablecimiento=7096&idperxeess=591818&idpersonalupdate=28652484&idperxeessupdate=591818&fgreniec=1&idpais=PER&idtipodocper=1&numdocper=72768824&numdocmed=&nombper=MARIBEL&apelpatper=MALCA&apelmatper=BUSTAMANTE&idsexoper=F&fechnacper=30%2F10%2F1990&codubigeores=060302&idubigeores=060302&descdireccion=C.POBLADO%20VILLANUEVA&fgnuevaresidencia=on&codubigeoresnew=&idubigeoresnew=060302&descdireccionnew=&idprofesion=53&idcolegio=00&estaper=A&fechaltper=02%2F03%2F2021&idcondper=8&iduser=25636&nameuser=72768824&vcemail=alex.arana.r.e%40gmail.com&fgactivo=1&daexpira=20211231&vccomentario=&motivobaja=A%20solicitud%20de%20alex%20arana%20rabanal&seccodigo=7&iddisa=7&idred=04&idmicrored=05&roles=1054%2C1052%2C1051%2C1024%2C1039&caditems=&cadsectores=&idsectorasignado=7&iddisaasignado=7&iddisausuario=10&fgsector=0&fgestado=1",
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then((res) => {


            console.log(res)
        });
    }
    consultarUsuario() {

        fetch("https://websalud.minsa.gob.pe/hisminsa/security", {
            "headers": {
                "accept": "*/*",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "JSESSIONID=E0306F0B227E79D2B965700724EBDEDC; _ga_F4HY3YK7EH=GS1.1.1613481795.4.0.1613481795.0; _ga=GA1.1.1150659243.1611596987; __cfduid=d0b98279f69d7c68b50200ccdc30d16f31614178009; rxVisitor=1614569245523JFLS1FRHEO96MP73671OIGR26H3T3EGM; _ga_T513LTCYK1=GS1.1.1614623537.12.1.1614623538.0; _ga_NWVQ3HSJKS=GS1.1.1614645699.35.0.1614645699.0; dtSa=-; dtPC=2$98191296_684h-vOPCXTBXUAAQNISOXUAMBBCAVSKMPXLFK; dtLatC=1; dtCookie=2$G93QMPSO52LA8K8TV6M7272INBE9NG3K|HISMINSA|1|RUM+Default+Application|1; rxvt=1614699996351|1614696352444; byt=4026e19faf33ddc14db0551d41a41a2b6c89c39fc4313aa2e5b036f65b8aac2d96865f172f10b65eaca5d51c0008664f075a8f6e11cdc6b9a36e717aabec36cbcca69b6b52bd1a9e3897a65dbc5d02d4"
            },
            "referrer": "https://websalud.minsa.gob.pe/hisminsa/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "C=USER&S=GETBYIDANDPERXEESS&iduser=33637&idpersonal=23962456&idperxeess=728059",
            "method": "POST",
            "mode": "cors"
        });


        fetch("https://websalud.minsa.gob.pe/hisminsa/security?_dc=1614691099755&numdocper=&idestado=-1&nombcompper=arana%20rabanal&idsector=7&iddisa=&idred=&idmicrored=&idestablecimiento=&iduser=10&C=USER&S=GETLIST&idflag=CP&page=1&start=0&limit=25", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "cookie": "JSESSIONID=6420B30DB14AB1F713DCCE17C6F70466; _ga_F4HY3YK7EH=GS1.1.1613481795.4.0.1613481795.0; _ga=GA1.1.1150659243.1611596987; __cfduid=d0b98279f69d7c68b50200ccdc30d16f31614178009; rxVisitor=1614569245523JFLS1FRHEO96MP73671OIGR26H3T3EGM; dtSa=-; dtLatC=55; dtPC=2$569245290_222h-vOPCXTSCPGFUNJSOXUAVOKEFRSLMPXLFT; dtCookie=2$G93QMPSO52LA8K8TV6M7272INBE9NG3K|HISMINSA|1; rxvt=1614612816723|1614609837042; _ga_T513LTCYK1=GS1.1.1614623537.12.1.1614623538.0; _ga_NWVQ3HSJKS=GS1.1.1614645699.35.0.1614645699.0; byt=4026e19faf33ddc14db0551d41a41a2b6c89c39fc4313aa2e5b036f65b8aac2d96865f172f10b65eaca5d51c0008664f075a8f6e11cdc6b9a36e717aabec36cbcca69b6b52bd1a9e3897a65dbc5d02d4"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors"
        });
    }

    async darBaja() {
        await fetch("https://websalud.minsa.gob.pe/hisminsa/security", {
            "headers": {
                "accept": "*/*",
                "accept-language": "es-ES,es;q=0.9,en;q=0.8",
                "cache-control": "no-cache",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-requested-with": "XMLHttpRequest",
                "cookie": "JSESSIONID=62075A823395F7CA7AA3262A4B1CE047; _ga_F4HY3YK7EH=GS1.1.1613481795.4.0.1613481795.0; _ga_LEDF527D3S=GS1.1.1615149485.2.0.1615149485.0; _ga_NWVQ3HSJKS=GS1.1.1616246531.42.0.1616246531.0; __cfduid=dd5bdc617b217e464fa82561c266ee95d1616770022; _ga_T513LTCYK1=GS1.1.1617765779.30.0.1617765779.0; _ga=GA1.3.1150659243.1611596987; _gid=GA1.3.1035860805.1617901053; dtCookie=-6$I7OBHF6309PH3FPD8KCNDG1MBNFD8GNJ; rxVisitor=1617930213505EISK1E0IN579IR5GOQRTPHBKEH4N2EDC; dtLatC=9; dtSa=-; dtPC=-6$330213496_707h-vQBWNJJEDBPYRDPYNPKMUMOHTLWPKJIPV; rxvt=1617974101364|1617972016872; byt=4026e19faf33ddc14db0551d41a41a2b6c89c39fc4313aa2e5b036f65b8aac2d96865f172f10b65eaca5d51c0008664f075a8f6e11cdc6b9a36e717aabec36cbcca69b6b52bd1a9e3897a65dbc5d02d4"
            },
            "referrer": "https://websalud.minsa.gob.pe/hisminsa/",
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": "C=USER&S=MOTIVOBAJAUPDATE&iduser=22513&idpersonal=28067609&idperxeess=705223&motivobaja=cambio%20de%20region",
            "method": "POST",
            "mode": "cors"
        });
    }



}
