import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginComponent }    from './login.component';

const loginroutes = [
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [ RouterModule.forChild(loginroutes),FormsModule ],
  exports: [ RouterModule ],
  declarations:[LoginComponent]
})
export class LoginRouting {}