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



}
