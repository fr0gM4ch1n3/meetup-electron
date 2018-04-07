import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Demo2Component } from './demo2.component';

const routes: Routes = [{
  path: 'demo2',
  component: Demo2Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Demo2RoutingModule { }
