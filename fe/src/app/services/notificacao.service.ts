import { Injectable } from '@angular/core';import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Notificacao } from '../interfaces/notificacao';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private readonly path = 'notificacao';

  constructor(private apiService: ApiService) {}

  findAll(): Observable<Notificacao[]> {
    return this.apiService.get<Notificacao[]>(this.path);
  }

  visualizar(id: number) {
    return this.apiService.post<Notificacao>(`${this.path}/visualizar/${id}`);
  }
}
