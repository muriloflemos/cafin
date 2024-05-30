import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { ApiService } from './api.service';
import { Usuario, CreateUsuarioDTO, FindUsuarioDto } from '../interfaces/usuario';
import { PaginatedDTO } from '../interfaces/paginated.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private apiService: ApiService) {}

  create(data: CreateUsuarioDTO): Observable<Usuario> {
    return this.apiService.post<Usuario>('usuario', data);
  }

  findAll(params: FindUsuarioDto): Observable<PaginatedDTO<Usuario>> {
    return this.apiService.get<PaginatedDTO<Usuario>>('usuario', params);
  }

  update(id: number, data: CreateUsuarioDTO): Observable<Usuario> {
    return this.apiService.put<Usuario>(`usuario/${id}`, data);
  }

  remove(id: number): Observable<Usuario> {
    return this.apiService.delete<Usuario>(`usuario/${id}`);
  }
}
