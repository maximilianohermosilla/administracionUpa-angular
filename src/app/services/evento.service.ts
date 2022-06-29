import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Evento } from '../models/evento';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private _refresh$ = new Subject<void>();

  private api = 'http://localhost:8080/evento'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getEventos(): Observable<any>{
    return this.http.get<Evento[]>(this.api).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  getEventosAll(): Observable<any>{
    return this.http.get<Evento[]>(this.api+'DTO').pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  // insertEvento(evento: Evento): Observable<Evento>{   
  //   const data = {'evento': evento, 'idTipoEvento': Number(evento.tipoEvento.id), 'idUsuario': evento.usuario.id};
  //   console.log(data);
  //   return this.http.post<Evento>(this.api+"/save", data);
  // }

  insertEvento(evento: Evento): Observable<Evento>{   
    const data = {'evento': evento, 'idTipoEvento': Number(evento.tipoEvento.id), 'idUsuario': evento.usuario.id};
    const apiUrlsave = this.api+"/saveEvento/"+evento.usuario.id+"/"+evento.tipoEvento.id;
    console.log(apiUrlsave);
    return this.http.post<Evento>(apiUrlsave, evento);
  }


  updateEvento(evento: Evento): Observable<Evento>{
    const updateUrl = `${this.api}/${evento.id}`
    console.log(evento);
    return this.http.put<Evento>(updateUrl, evento, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }  

  deleteEvento(evento: Evento): Observable<any>{
    const deleteUrl = `${this.api}/${evento.id}`
    return this.http.delete<Evento>(deleteUrl, {responseType: "text" as "json"});
  }


}
