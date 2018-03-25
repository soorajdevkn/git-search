import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { HomeComponent }    from './home.component';
import { AuthGuard } from '../auth-guard.service';

const homeroutes = [
  { path: 'home',canActivate:[AuthGuard] , component: HomeComponent},
];

@NgModule({
  imports: [ RouterModule.forChild(homeroutes),CommonModule,FormsModule ],
  exports: [ RouterModule ],
  declarations:[HomeComponent]
})
export class HomeRouting {}