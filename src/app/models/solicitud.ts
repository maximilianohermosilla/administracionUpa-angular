import { Evento } from "./evento";
import { TipoEvento } from "./tipoEvento";
import { Usuario } from "./usuario";

export interface Solicitud{
    id?: number,
    descripcion: string,
    date_time: string,
    aprobado: boolean,
    date_time_aprobado: string,
    evento: Evento,
    usuario: Usuario,
    tipoEvento: TipoEvento,
}