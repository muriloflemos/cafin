import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../interfaces/usuario';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Notificacao } from '../interfaces/notificacao';
import { NotificacaoService } from '../services/notificacao.service';
import { ClienteService } from '../services/cliente.service';
import { Cliente, FindClienteDto } from '../interfaces/cliente';
import { PaginatedDTO } from '../interfaces/paginated.dto';
import { startOfDay } from 'date-fns';
import { SessionService } from '../services/session.service';
import { AniversariantesComponent } from '../features/aniversariantes/aniversariantes.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  isAdmin = false;
  hasClienteRole = false;
  hasAvaliacaoRole = false;
  hasEvolucoesRole = false;

  private onDestroy$ = new Subject();

  notificacoes: Notificacao[] = [];
  isNotificationOpen = false;

  constructor(
    private authService: AuthService,
    private notificacaoService: NotificacaoService,
    private clienteService: ClienteService,
    private sessionService: SessionService,
    public dialog: MatDialog,
  ) {
    this.isAdmin = this.authService.isAdmin();
    this.hasClienteRole = this.authService.hasRole(Role.CLIENTE);
    this.hasAvaliacaoRole = this.authService.hasRole(Role.AVALIACAO);
    this.hasEvolucoesRole = this.authService.hasRole(Role.EVOLUCAO);
  }

  async ngOnInit() {
    this.getNotificacaoes();
    this.getAniversariantes();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(null);
    this.onDestroy$.complete();
  }

  getNotificacaoes(): void {
    this.notificacaoService.findAll()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((notificacoes: Notificacao[]) => {
        this.notificacoes = notificacoes;
      });
  }

  clickNotificacao(notificacao: Notificacao): void {
    this.notificacaoService.visualizar(notificacao.id)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((notificacao: Notificacao) => {
        const index = this.notificacoes.findIndex((value) => value.id === notificacao.id);
        this.notificacoes[index] = notificacao;
      });
  }

  getAniversariantes(): void {
    if (!this.isAdmin) return;

    const aniversariantes = this.sessionService.getAniversariantes();
    if (aniversariantes.length > 0) return;

    const params: FindClienteDto = {
      dataAniversario: startOfDay(new Date()).toISOString(),
      take: 100,
      skip: 0,
    };
    this.clienteService.findAll(params)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((result: PaginatedDTO<Cliente>) => {
        if (result.count > 0) {
          this.sessionService.setAniversariantes(result.data);
          this.showAniversariantes();
        }
      });
  }

  showAniversariantes() {
    const dialogRef = this.dialog.open(AniversariantesComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
