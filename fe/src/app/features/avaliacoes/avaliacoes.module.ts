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
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { PageHeaderModule } from '../../components/page-header/page-header.module';
import { ButtonModule } from '../../components/button/button.module';
import { PaginatorService } from '../../services/paginator.service';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { AvaliacoesComponent } from './avaliacoes.component';
import { FormAvaliacoesComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    component: AvaliacoesComponent,
  },
  {
    path: 'form',
    component: FormAvaliacoesComponent,
  },
  {
    path: 'form/:id',
    component: FormAvaliacoesComponent,
  }
];

@NgModule({
  declarations: [
    AvaliacoesComponent,
    FormAvaliacoesComponent,
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
    MatNativeDateModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatRadioModule,
    PageHeaderModule,
    ButtonModule,
  ],
  providers: [provideNgxMask(), {provide: MatPaginatorIntl, useClass: PaginatorService}],
})
export class AvaliacoesModule { }
