import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatosAsistenciaPage } from './datos-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: DatosAsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatosAsistenciaPageRoutingModule {}
