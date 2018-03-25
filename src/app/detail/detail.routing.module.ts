import { NgModule }            from '@angular/core';
import { RouterModule }        from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DetailComponent }    from './detail.component';
import { AuthGuard } from '../auth-guard.service';

const homeroutes = [
  { path: 'detail/:username',canActivate:[AuthGuard] , component: DetailComponent},
];

@NgModule({
  imports: [ RouterModule.forChild(homeroutes),CommonModule,FormsModule ],
  exports: [ RouterModule ],
  declarations:[DetailComponent]
})
export class DeatilRouting {}