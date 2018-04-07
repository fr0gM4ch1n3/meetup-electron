import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DemoModule } from './demo/demo.module';
import { Demo2Module } from './demo2/demo2.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    DemoModule,
    Demo2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
