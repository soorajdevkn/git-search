import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRouting } from './home.routing.module';
import { FormsModule } from '@angular/forms';
import { HomeService } from './home.service';

@NgModule({
  imports: [
    CommonModule,
    HomeRouting,
    FormsModule
  ],
  declarations: [],
  providers: [HomeService]
})
export class HomeModule { }
