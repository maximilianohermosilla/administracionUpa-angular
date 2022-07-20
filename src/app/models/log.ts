import { Usuario } from "./usuario";
import { TipoLog } from "./tipolog";

export interface Log{
    id?: number,
    descripcion: string,
    date_time: string,    
    tipoLog: TipoLog,
    usuario: Usuario
}