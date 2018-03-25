import { NgModule, NO_ERRORS_SCHEMA }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { DetailModule } from './detail/detail.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { AuthGuard } from './auth-guard.service';
import { ToastrModule } from 'ngx-toastr';
import { MasterService } from './classes/master-service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
		tokenGetter: (() => localStorage.getItem('token')),
		globalHeaders: [{'Content-Type':'application/json'}],
	}), http, options);
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HomeModule,
    LoginModule,
    DetailModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    AuthGuard,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    MasterService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
// "./assets/bootstrap/bootstrap.min.scss",
export class AppModule { }
