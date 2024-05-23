import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  isAdmin = false;
  isEstoque = false;
  isFinanceiroReceber = false;
  isFinanceiroPagar = false;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.isAdmin();
    // this.isEstoque = this.authService.isEstoque();
    // this.isFinanceiroReceber = this.authService.isFinanceiroReceber();
    // this.isFinanceiroPagar = this.authService.isFinanceiroPagar();
  }
}
