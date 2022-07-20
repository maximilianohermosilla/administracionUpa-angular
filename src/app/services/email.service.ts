import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private _refresh$ = new Subject<void>();
  
  private api = 'https://administracion-upa-10.herokuapp.com//sendMail'
  private apiWelcomeEmail = 'https://administracion-upa-10.herokuapp.com//welcome-email'
  private apiWelcome = 'https://administracion-upa-10.herokuapp.com//welcome'

  //private api = 'http://localhost:8080/sendMail'
  //private apiWelcomeEmail = 'http://localhost:8080/welcome-email'
  //private apiWelcome = 'http://localhost:8080/welcome'

  constructor(private http:HttpClient) { }

  get refresh$(){
    return this._refresh$;
  }

  sendWelcome(): Observable<String>{ 
    return this.http.post<String>(this.apiWelcome, {}, httpOptions);
  }
}
