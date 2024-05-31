import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Usuario, SaveUsuarioDTO, FindUsuarioDto } from '../interfaces/usuario';
import { PaginatedDTO } from '../interfaces/paginated.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private apiService: ApiService) {}

  findAll(params: FindUsuarioDto): Observable<PaginatedDTO<Usuario>> {
    return this.apiService.get<PaginatedDTO<Usuario>>('usuario', params);
  }

  findById(id: number): Observable<Usuario> {
    return this.apiService.get<Usuario>(`usuario/${id}`);
  }

  create(data: SaveUsuarioDTO): Observable<Usuario> {
    return this.apiService.post<Usuario>('usuario', data);
  }

  update(id: number, data: SaveUsuarioDTO): Observable<Usuario> {
    return this.apiService.put<Usuario>(`usuario/${id}`, data);
  }

  remove(id: number): Observable<Usuario> {
    return this.apiService.delete<Usuario>(`usuario/${id}`);
  }
}
