import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { authGuard } from '../auth.guard';
// import { AdminGuard, FinanceiroGuard, EstoqueGuard, ContasPagarGuard } from '../guards';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'usuarios',
        canActivate: [authGuard],
        loadChildren: () =>
          import('../features/usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
