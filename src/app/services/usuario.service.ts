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
  private apiFile = 'http://localhost:8080/fileUsuario/'
  private apiFileData = 'http://localhost:8080/fileUser/'

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

  findUsuario(idUsuario: number){
    return this.http.get<Usuario>(this.api+"/"+idUsuario).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  getProfilePhoto(idUsuario: number): Observable<any>{
    return this.http.get(this.apiFile+idUsuario, {responseType: "text"}).pipe(      
      tap(() => {
         this._refresh$.next();       
      })
    );
  }

  getImage(idUsuario: number): Observable<any>{
    return this.http.get(this.apiFileData+idUsuario, {responseType: "text"}).pipe(      
      tap(() => {
         this._refresh$.next();       
      })
    );
  }

  insertUsuario(usuario: Usuario): Observable<Usuario>{ 
    usuario.id=null;  
    console.log(usuario);
    const data = {'usuario': usuario};
    const apiUrlsave = this.api+"/save";
    //console.log(apiUrlsave);
    return this.http.post<Usuario>(apiUrlsave, usuario);
  }


  updateUsuario(usuario: Usuario): Observable<Usuario>{
    const updateUrl = `${this.api}/${usuario.id}`
    console.log(usuario);
    return this.http.put<Usuario>(updateUrl, usuario, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }  

  deleteUsuario(usuario: Usuario): Observable<Usuario>{
    const deleteUrl = `${this.api}/${usuario.id}`
    return this.http.delete<Usuario>(deleteUrl, {responseType: "text" as "json"});
  }
}
