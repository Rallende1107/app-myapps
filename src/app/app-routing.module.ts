import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    redirectTo: 'registro',
    pathMatch: 'full'
  },
  {
    path: 'home',
    redirectTo: 'my-home',
    pathMatch: 'full'
  },
  {
    path: 'cambio-contrasenia',
    redirectTo: 'cambio-contrasenia',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page404',
    pathMatch: 'full'
  },


  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'my-home',
    loadChildren: () => import('./pages/my-home/my-home.module').then( m => m.MyHomePageModule)
  },
  {
    path: 'cambio-contrasenia',
    loadChildren: () => import('./pages/cambio-contrasenia/cambio-contrasenia.module').then( m => m.CambioContraseniaPageModule)
  },
  {
    path: 'page404',
    loadChildren: () => import('./pages/page404/page404.module').then( m => m.Page404PageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
