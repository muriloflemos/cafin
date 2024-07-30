import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../interfaces/usuario';
import { Subject, takeUntil } from 'rxjs';
import { Notificacao } from '../interfaces/notificacao';
import { NotificacaoService } from '../services/notificacao.service';

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
  ) {
    this.isAdmin = this.authService.isAdmin();
    this.hasClienteRole = this.authService.hasRole(Role.CLIENTE);
    this.hasAvaliacaoRole = this.authService.hasRole(Role.AVALIACAO);
    this.hasEvolucoesRole = this.authService.hasRole(Role.EVOLUCAO);
  }

  async ngOnInit() {
    this.getNotificacaoes();
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
}
