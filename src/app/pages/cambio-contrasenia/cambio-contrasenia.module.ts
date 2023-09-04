import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar FormsModule y ReactiveFormsModule

import { IonicModule } from '@ionic/angular';

import { CambioContraseniaPageRoutingModule } from './cambio-contrasenia-routing.module';

import { CambioContraseniaPage } from './cambio-contrasenia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CambioContraseniaPageRoutingModule
  ],
  declarations: [CambioContraseniaPage]
})
export class CambioContraseniaPageModule {}
