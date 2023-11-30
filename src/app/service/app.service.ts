import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  apiHost: string = 'http://localhost:8080/api';
  headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private readonly http: HttpClient
  ) { }


  isLoggedInSubject = new Subject<boolean>();

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  getUsername(){
    var decToken;
    var token: string = localStorage.getItem('token') ?? "";
    decToken = this.getDecodedAccessToken(token);
    return decToken.sub;
  }

  
  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }

  login(username: string, password: string){
    const url = this.apiHost + `/auth/login`;
    return this.http.post<any>(url,{username: username,password: password}, { headers: this.headers });
  }

  register(username:string, password:string, name:string, surname:string, date:string){
    const url = this.apiHost + `/user/create`;
    return this.http.post<any>(url,{username: username,
      password: password,name:name,surname:surname,birthDate:date}, { headers: this.headers });
  }
}
