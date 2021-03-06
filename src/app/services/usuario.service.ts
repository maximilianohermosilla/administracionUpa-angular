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

const httpOptionsFTP = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

httpOptionsFTP.headers.append('Access-Control-Allow-Origin', '*');
httpOptionsFTP.headers.append('Access-Control-Allow-Origin', '*');
httpOptionsFTP.headers.append("Access-Control-Allow-Headers", "X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
httpOptionsFTP.headers.append("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
httpOptionsFTP.headers.append("Allow", "GET, POST, OPTIONS, PUT, DELETE");

httpOptions.headers.append('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private _refresh$ = new Subject<void>();
  
  private api = 'https://administracion-upa-10.herokuapp.com/usuario'
  private apiFile = 'https://administracion-upa-10.herokuapp.com/fileUsuario/'
  private apiFileData = 'https://administracion-upa-10.herokuapp.com/fileUser/'
  private apiFTP = 'http://localhost:8080/ftp-download'

  //private api = 'http://localhost:8080/usuario'
  //private apiFile = 'http://localhost:8080/fileUsuario/'
  //private apiFileData = 'http://localhost:8080/fileUser/'

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

  getFTP(): Observable<Blob>{
    return this.http.get<Blob>(this.apiFTP, { headers: httpOptionsFTP.headers, responseType: "blob" as 'json'});
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
