import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import 'rxjs/Rx';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { master } from '../classes/master';
import { MasterService } from '../classes/master-service';

@Injectable()
export class LoginService {
  isLoggedIn: boolean;
  redirectUrl: string;
  requireLoginSubject: Subject<boolean>;
  lastUrl: string;

  constructor(private http: Http, private router: Router, private dataService: MasterService) { 
    this.requireLoginSubject = new Subject<boolean>();
    this.lastUrl = "/home";
  }
  login(username, password): Observable<any> {
    let authURL = `${master.apiURL}user`;
    let token = ("Basic " + btoa(username+ ':' + password));
    localStorage.setItem("token",token);
    let headers: Headers = new Headers();
    headers.append("Authorization",token)
    return this.http.get(authURL,{headers:headers})
      .map(response => {
        this.requireLoginSubject.next(true);
        return response;
      })  
      .catch(error => {
        return Observable.throw(error.json());
      });
  }
  checkAuth(): boolean {
    if(localStorage.getItem("login") == "true"){
      return true;
    }else{
      return false;
    }
  }
  logout() {
    this.requireLoginSubject.next(true);
    localStorage.removeItem('login');
  }
  watchAuthenticate(): Observable<any>{
    return this.requireLoginSubject.asObservable();
  }
}