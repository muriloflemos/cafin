import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { authGuard } from '../auth.guard';
import { adminGuard } from '../guards/admin.guard';
import { clienteGuard } from '../guards/cliente.guard';
import { evolucaoGuard } from '../guards/evolucao.guard';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../features/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'usuarios',
        canActivate: [adminGuard],
        loadChildren: () =>
          import('../features/usuarios/usuarios.module').then((m) => m.UsuariosModule),
      },
      {
        path: 'clientes',
        canActivate: [clienteGuard],
        loadChildren: () =>
          import('../features/clientes/clientes.module').then((m) => m.ClientesModule),
      },
      {
        path: 'evolucoes',
        canActivate: [evolucaoGuard],
        loadChildren: () =>
          import('../features/evolucoes/evolucoes.module').then((m) => m.EvolucoesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
