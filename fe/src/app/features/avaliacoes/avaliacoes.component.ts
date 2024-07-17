import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { startOfDay } from 'date-fns';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { AlertService } from '../../services/alert/alert.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { PaginatedDTO } from '../../interfaces/paginated.dto';
import { Avaliacao, FindAvaliacaoDto } from '../../interfaces/avaliacao';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})
export class AvaliacoesComponent {
  private readonly filterKey = 'AvaliacoesComponent.filter';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  active = false;

  private onDestroy$ = new Subject();

  displayedColumns: string[] = [
    'data',
    'cliente',
    'pontuacao',
    'actions',
  ];

  pageIndex = 0;
  pageSize = 10;

  private dataParams = new BehaviorSubject<FindAvaliacaoDto | null>(null);
  dataSource$: Observable<PaginatedDTO<Avaliacao>> = this.dataParams.asObservable()
    .pipe(
      takeUntil(this.onDestroy$),
      filter((params) => params !== null),
      switchMap((params) => {
        if (params !== null) {
          this.loadingSubject.next(true);
          return this.avaliacaoService.findAll(params);
        }
        return [];
      }),
      tap(() => {
        this.loadingSubject.next(false);
      }),
    );

  form = this.formBuilder.group(
    {
      startDate: new FormControl<Date | null>(null),
      endDate: new FormControl<Date | null>(null),
      cliente: [''],
    },
  );

  constructor(
    private formBuilder: FormBuilder,
    private readonly avaliacaoService: AvaliacaoService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.loadFilter();
    this.filtrar();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  limpar(): void {
    this.form.reset();
    this.localStorageService.remove(this.filterKey);
  }

  filtrar(): void {
    this.active = true;
    this.pageIndex = 0;
    this.saveFilter();
    this.load();
  }

  loadFilter(): void {
    const data = this.localStorageService.get(this.filterKey);
    if (data) {
      const filter = JSON.parse(data);
      this.form.patchValue(filter);
    }
  }

  saveFilter(): void {
    const data = JSON.stringify(this.form.value);
    this.localStorageService.set(this.filterKey, data);
  }

  load(): void {
    const params: FindAvaliacaoDto = {};
    const { startDate, endDate, cliente } = this.form.value;

    if (startDate && endDate) {
      params.startDate = startOfDay(startDate).toISOString();
      params.endDate = startOfDay(endDate).toISOString();
    }

    if (!!cliente) params.cliente = cliente;
    params.take = this.pageSize;
    params.skip = this.pageSize * this.pageIndex;
    this.dataParams.next(params);
  }

  add(): void {
    this.router.navigate(['avaliacoes', 'form']);
  }

  visualizar(avalicao: Avaliacao): void {
    this.router.navigate(['avaliacoes', 'form', avalicao.id]);
  }

  excluir(avalicao: Avaliacao): void {
    const title = 'Excluir avaliação';
    const message = `Deseja realmente excluir a avaliação?`;
    this.alertService.showYesNo(title, message)
    .then((result: boolean) => {
      if (result) {
        this.avaliacaoService.remove(avalicao.id)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe({
            complete: () => {
              this.load();
            },
            error: (err) => {
              const message = 'Não foi possível excluir a avaliação!';
              this.alertService.showError(title, message);
            },
          });
      }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.load();
  }
}
