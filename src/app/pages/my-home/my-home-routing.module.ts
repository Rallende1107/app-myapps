import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHomePage } from './my-home.page';

const routes: Routes = [
  {
    path: '',
    component: MyHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyHomePageRoutingModule {}
