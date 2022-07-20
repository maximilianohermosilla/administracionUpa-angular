import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject, } from 'rxjs';
import { map, tap } from 'rxjs/operators'
import { Log } from '../models/log';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class LogService {

  private _refresh$ = new Subject<void>();
  
  private api = 'https://administracion-upa-10.herokuapp.com/logs'
  //private api = 'http://localhost:8080/logs'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  getAll(): Observable<any>{
    return this.http.get<Log[]>(this.api).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  findLog(idLog: number){
    return this.http.get<Log>(this.api+"/log/"+idLog).pipe(
      tap(() => {
         this._refresh$.next();       
      })
    )
  }

  insertLog(log: Log): Observable<Log>{ 
    log.id=null;  
    console.log(log);
    const data = {'log': log};
    const apiUrlsave = this.api+"/save/"+log.usuario.id+"/"+log.tipoLog.id;
    console.log(apiUrlsave);
    return this.http.post<Log>(apiUrlsave, log);
  }


  updateLog(log: Log): Observable<Log>{
    const updateUrl = `${this.api}/${log.id}`
    console.log(log);
    return this.http.put<Log>(updateUrl, log, {responseType: "text" as "json"}).pipe(
      tap(() => {
         this.refresh$.next();       
      })
    );
  }  

  deleteLog(log: Log): Observable<Log>{
    const deleteUrl = `${this.api}/${log.id}`
    return this.http.delete<Log>(deleteUrl, {responseType: "text" as "json"});
  }
}