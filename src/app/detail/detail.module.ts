import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeatilRouting } from './detail.routing.module';
import { DetailService } from './detail.service';

@NgModule({
  imports: [
    CommonModule,
    DeatilRouting
  ],
  declarations: [],
  providers:[DetailService]
})
export class DetailModule { }
