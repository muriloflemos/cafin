import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, filter, map, switchMap, takeUntil, tap } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Usuario, FindUsuarioDto } from '../../interfaces/usuario';
import { PaginatedDTO } from 'src/app/interfaces/paginated.dto';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {
  private readonly filterKey = 'UsuariosComponent.filter';

  private loadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.loadingSubject.asObservable();
  active = false;

  private onDestroy$ = new Subject();

  displayedColumns: string[] = [
    'nome',
    'username',
    'email',
    'actions',
  ];

  pageIndex = 0;
  pageSize = 10;

  private dataParams = new BehaviorSubject<FindUsuarioDto | null>(null);
  dataSource$: Observable<PaginatedDTO<Usuario>> = this.dataParams.asObservable()
    .pipe(
      takeUntil(this.onDestroy$),
      filter((params) => params !== null),
      switchMap((params) => {
        if (params !== null) {
          this.loadingSubject.next(true);
          return this.usuarioService.findAll(params);
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
    },
  );

  constructor(
    private formBuilder: FormBuilder,
    private readonly usuarioService: UsuarioService,
    private readonly localStorageService: LocalStorageService,
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
    const params: FindUsuarioDto = {};
    const { nome, username, email } = this.form.value;
    if (!!nome) params.nome = nome;
    if (!!username) params.username = username;
    if (!!email) params.email = email;
    params.take = this.pageSize;
    params.skip = this.pageSize * this.pageIndex;
    this.dataParams.next(params);
  }

  editar(usuario: Usuario): void {
    // TO DO
  }

  excluir(usuario: Usuario): void {
    // TO DO
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.load();
  }
}
