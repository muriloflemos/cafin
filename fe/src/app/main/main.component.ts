import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Role } from '../interfaces/usuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isAdmin = false;
  hasClienteRole = false;
  hasAvaliacaoRole = false;
  hasEvolucoesRole = false;
  hasNotificacoesRole = false;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
    this.hasClienteRole = this.authService.hasRole(Role.CLIENTE);
  }
}
