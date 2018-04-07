import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Demo2RoutingModule } from './demo2-routing.module';
import { Demo2Component } from './demo2.component';

@NgModule({
  imports: [
    CommonModule,
    Demo2RoutingModule
  ],
  declarations: [Demo2Component]
})
export class Demo2Module { }
