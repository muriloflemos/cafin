import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Cliente, SaveClienteDTO, FindClienteDto, Historico } from '../interfaces/cliente';
import { PaginatedDTO } from '../interfaces/paginated.dto';
import { Avaliacao } from '../interfaces/avaliacao';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly path = 'cliente';

  constructor(private apiService: ApiService) {}

  findAll(params: FindClienteDto): Observable<PaginatedDTO<Cliente>> {
    return this.apiService.get<PaginatedDTO<Cliente>>(this.path, params);
  }

  findById(id: number): Observable<Cliente> {
    return this.apiService.get<Cliente>(`${this.path}/${id}`);
  }

  create(data: SaveClienteDTO): Observable<Cliente> {
    return this.apiService.post<Cliente>(this.path, data);
  }

  update(id: number, data: SaveClienteDTO): Observable<Cliente> {
    return this.apiService.put<Cliente>(`${this.path}/${id}`, data);
  }

  remove(id: number): Observable<Cliente> {
    return this.apiService.delete<Cliente>(`${this.path}/${id}`);
  }

  historico(id: number): Observable<{ historico: Historico[], avaliacoes: Avaliacao[] }> {
    return this.apiService.get<{ historico: Historico[], avaliacoes: Avaliacao[] }>(`${this.path}/historico/${id}`);
  }
}
