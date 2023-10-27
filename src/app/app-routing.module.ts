import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registrar',
    loadChildren: () => import('./page/registrar/registrar.module').then( m => m.RegistrarPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./page/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./page/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'geo',
    loadChildren: () => import('./page/geo/geo.module').then( m => m.GeoPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./page/recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },  {
    path: 'datos-asistencia',
    loadChildren: () => import('./page/datos-asistencia/datos-asistencia.module').then( m => m.DatosAsistenciaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
