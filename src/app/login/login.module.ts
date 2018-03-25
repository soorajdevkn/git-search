import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { LoginRouting } from './login.routing.module';
import { LoginService } from './login.service';

@NgModule({
  imports: [
    BrowserModule,
    LoginRouting
  ],
  declarations: [ ],
  providers:[LoginService]
})
export class LoginModule { }
