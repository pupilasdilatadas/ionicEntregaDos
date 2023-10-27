import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosAsistenciaPageRoutingModule } from './datos-asistencia-routing.module';

import { DatosAsistenciaPage } from './datos-asistencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosAsistenciaPageRoutingModule
  ],
  declarations: [DatosAsistenciaPage]
})
export class DatosAsistenciaPageModule {}
