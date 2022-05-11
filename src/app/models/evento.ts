import { TipoEvento } from "./tipoEvento";
import { Usuario } from "./usuario";

export interface Evento{
    id?: number,
    title: string,
    description: string,
    start: string,
    end: string,
    backgroundColor: string,
    borderColor: string,
    color: string,
    editable: boolean,
    enabled: boolean,
    newEvent: boolean,
    tipoEvento: TipoEvento,
    usuario: Usuario
}