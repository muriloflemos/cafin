import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Evolucao, SaveEvolucaoDTO, FindEvolucaoDto } from '../interfaces/evolucao';
import { PaginatedDTO } from '../interfaces/paginated.dto';

@Injectable({
  providedIn: 'root'
})
export class EvolucaoService {
  private readonly path = 'evolucao';

  constructor(private apiService: ApiService) {}

  findAll(params: FindEvolucaoDto): Observable<PaginatedDTO<Evolucao>> {
    return this.apiService.get<PaginatedDTO<Evolucao>>(this.path, params);
  }

  findById(id: number): Observable<Evolucao> {
    return this.apiService.get<Evolucao>(`${this.path}/${id}`);
  }

  create(data: SaveEvolucaoDTO): Observable<Evolucao> {
    return this.apiService.post<Evolucao>(this.path, data);
  }

  update(id: number, data: SaveEvolucaoDTO): Observable<Evolucao> {
    return this.apiService.put<Evolucao>(`${this.path}/${id}`, data);
  }

  remove(id: number): Observable<Evolucao> {
    return this.apiService.delete<Evolucao>(`${this.path}/${id}`);
  }
}
