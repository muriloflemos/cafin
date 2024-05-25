import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: UsuariosComponent,
  }
];

@NgModule({
  declarations: [UsuariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class UsuariosModule { }
