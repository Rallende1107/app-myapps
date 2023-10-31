import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyHomePageRoutingModule } from './my-home-routing.module';

import { MyHomePage } from './my-home.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyHomePageRoutingModule
  ],
  declarations: [MyHomePage]
})
export class MyHomePageModule {}
