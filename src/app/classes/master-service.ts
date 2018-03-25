import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable() 
export class MasterService {
  authenticatedFlag:boolean;
  authenticateWatcher = new Subject<boolean>();
  redirectUrl:string ="/home";
  lastGetId = 0;
  setAuthenticate(key:boolean){
    this.authenticatedFlag = key;
    this.authenticateWatcher.next(true);
  }
  watchAuthenticate(): Observable<any>{
    return this.authenticateWatcher.asObservable();
  }
}