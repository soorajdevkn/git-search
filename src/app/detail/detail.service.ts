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
export class DetailService {
  constructor(private http: Http, private router: Router, private dataService: MasterService) { }
  getRepo(username): Observable<any> {
    let authURL = `${master.apiURL}users/${username}/repos`;
    let token = localStorage.getItem("token");
    let headers: Headers = new Headers();
    headers.append("Authorization",token)
    return this.http.get(authURL,{headers:headers})
      .map(response => {
        return response.json();
      })
      .catch(error => {
        return Observable.throw(error.json());
      });
  }
  getUser(name): Observable<any> {
    let authURL = `${master.apiURL}users/${name}`;
    let token = localStorage.getItem("token");
    let headers: Headers = new Headers();
    headers.append("Authorization",token)
    return this.http.get(authURL,{headers:headers})
      .map(response => {
        return response.json();
      })
      .catch(error => {
        return Observable.throw(error.json());
      });
  }
  getFollowers(url): Observable<any> {
    let token = localStorage.getItem("token");
    let headers: Headers = new Headers();
    headers.append("Authorization",token)
    return this.http.get(url,{headers:headers})
      .map(response => {
        return response.json();
      })
      .catch(error => {
        return Observable.throw(error.json());
      });
  }
}