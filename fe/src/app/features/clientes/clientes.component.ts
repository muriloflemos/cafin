import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, filter, switchMap, takeUntil, tap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import { AlertService } from '../../services/alert/alert.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Cliente, FindClienteDto } from '../../interfaces/cliente';
import { PaginatedDTO } from '../../interfaces/paginated.dto';
import { startOfDay } from 'date-fns';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, OnDestroy {
  private readonly filterKey = 'ClientesComponent.filter';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  active = false;

  private onDestroy$ = new Subject();

  displayedColumns: string[] = [
    'nome',
    'telefone',
    'dataNascimento',
    'cpf',
    'actions',
  ];

  pageIndex = 0;
  pageSize = 10;

  private dataParams = new BehaviorSubject<FindClienteDto | null>(null);
  dataSource$: Observable<PaginatedDTO<Cliente>> = this.dataParams.asObservable()
    .pipe(
      takeUntil(this.onDestroy$),
      filter((params) => params !== null),
      switchMap((params) => {
        if (params !== null) {
          this.loadingSubject.next(true);
          return this.clienteService.findAll(params);
        }
        return [];
      }),
      tap(() => {
        this.loadingSubject.next(false);
      }),
    );

  form = this.formBuilder.group(
    {
      nome: [''],
      username: [''],
      email: ['', Validators.email],
      dataAniversario: new FormControl<Date | null>(null),
    },
  );

  constructor(
    private formBuilder: FormBuilder,
    private readonly clienteService: ClienteService,
    private readonly localStorageService: LocalStorageService,
    private readonly router: Router,
    private readonly alertService: AlertService,
  ) {}

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
    const params: FindClienteDto = {};
    const { nome, email, dataAniversario } = this.form.value;
    if (!!nome) params.nome = nome;
    if (!!email) params.email = email;
    if (!!dataAniversario) params.dataAniversario = startOfDay(dataAniversario).toISOString();
    params.take = this.pageSize;
    params.skip = this.pageSize * this.pageIndex;
    this.dataParams.next(params);
  }

  add(): void {
    this.router.navigate(['clientes', 'form']);
  }

  editar(cliente: Cliente): void {
    this.router.navigate(['clientes', 'form', cliente.id]);
  }

  historico(cliente: Cliente): void {
    this.router.navigate(['clientes', 'historico', cliente.id]);
  }

  excluir(cliente: Cliente): void {
    const title = 'Excluir usuário';
    const message = `Deseja realmente excluir o cliente ${cliente.nome}?`;
    this.alertService.showYesNo(title, message)
    .then((result: boolean) => {
      if (result) {
        this.clienteService.remove(cliente.id)
          .pipe(takeUntil(this.onDestroy$))
          .subscribe({
            complete: () => {
              this.load();
            },
            error: (err) => {
              const message = 'Não foi possível excluir o cliente!';
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
