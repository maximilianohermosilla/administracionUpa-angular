import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Usuario } from '../models/usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _refresh$ = new Subject<void>();
  
  private api = 'http://localhost:8080/usuario'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getUsuarios(): Observable<any>{
    return this.http.get<Usuario[]>(this.api).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }
}
