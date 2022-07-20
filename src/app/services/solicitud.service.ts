import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Log } from '../models/log';
import { Solicitud } from '../models/solicitud';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private _refresh$ = new Subject<void>();
  
  private api = 'https://administracion-upa-10.herokuapp.com/solicitud'
  private apiGet = 'https://administracion-upa-10.herokuapp.com/solicitudes'
  private apiPost = 'https://administracion-upa-10.herokuapp.com/saveSolicitud'

  //private api = 'http://localhost:8080/solicitud'
  //private apiGet = 'http://localhost:8080/solicitudes'
  //private apiPost = 'http://localhost:8080/saveSolicitud'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getAll(): Observable<any>{
    return this.http.get<Solicitud[]>(this.apiGet).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  getSolicitudesUsuario(idUsuario: number){
    return this.http.get<Solicitud>(this.api+"/solicitudes/"+idUsuario).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  insertSolicitud(solicitud: Solicitud): Observable<Solicitud>{ 
    solicitud.id=null;  
    console.log(solicitud);
    const data = {'losolicitudg': solicitud};
    const apiUrlsave = this.apiPost+"/"+solicitud.evento.id;
    console.log(apiUrlsave);
    return this.http.post<Solicitud>(apiUrlsave, solicitud);
  }


  updateLog(solicitud: Solicitud): Observable<Solicitud>{
    const updateUrl = `${this.api}/${solicitud.id}`
    console.log(solicitud);
    return this.http.put<Solicitud>(updateUrl, solicitud, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }  

  deleteLog(solicitud: Solicitud): Observable<Solicitud>{
    const deleteUrl = `${this.api}/${solicitud.id}`
    return this.http.delete<Solicitud>(deleteUrl, {responseType: "text" as "json"});
  }
}