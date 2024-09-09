import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Cliente } from '../../interfaces/cliente';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-aniversariantes',
  templateUrl: './aniversariantes.component.html',
  styleUrls: ['./aniversariantes.component.css'],
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatListModule],
})
export class AniversariantesComponent implements OnInit {
  aniversariantes: Cliente[] = [];

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.aniversariantes = this.sessionService.getAniversariantes();
  }
}
