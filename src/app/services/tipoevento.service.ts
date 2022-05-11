import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap, map } from 'rxjs';
import { TipoEvento } from '../models/tipoEvento';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TipoeventoService {

  private _refresh$ = new Subject<void>();
  
  private api = 'http://localhost:8080/tipoevento'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getTipoEvento(): Observable<any>{
    return this.http.get<TipoEvento[]>(this.api).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

}
