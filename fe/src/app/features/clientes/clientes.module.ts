import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { ClientesComponent } from './clientes.component';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { ButtonModule } from '../../components/button/button.module';
import { PaginatorService } from '../../services/paginator.service';
import { FormClienteComponent } from './form/form.component';
import { HistoricoComponent } from './historico/historico.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
  },
  {
    path: 'form',
    component: FormClienteComponent,
  },
  {
    path: 'form/:id',
    component: FormClienteComponent,
  },
  {
    path: 'historico/:id',
    component: HistoricoComponent,
  },
];

@NgModule({
  declarations: [
    ClientesComponent,
    FormClienteComponent,
    HistoricoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatPaginatorModule,
    MatListModule,
    MatDatepickerModule,
    MatNativeDateModule,
    PageHeaderModule,
    ButtonModule,
    HighchartsChartModule,
  ],
  providers: [provideNgxMask(), { provide: MatPaginatorIntl, useClass: PaginatorService }],
})
export class ClientesModule { }
