import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Avaliacao, CreateAvaliacaoDto, FindAvaliacaoDto } from '../interfaces/avaliacao';
import { PaginatedDTO } from '../interfaces/paginated.dto';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {
  private readonly path = 'avaliacao';

  constructor(private apiService: ApiService) {}

  findAll(params: FindAvaliacaoDto): Observable<PaginatedDTO<Avaliacao>> {
    return this.apiService.get<PaginatedDTO<Avaliacao>>(this.path, params);
  }

  findById(id: number): Observable<Avaliacao> {
    return this.apiService.get<Avaliacao>(`${this.path}/${id}`);
  }

  create(data: CreateAvaliacaoDto): Observable<Avaliacao> {
    return this.apiService.post<Avaliacao>(this.path, data);
  }

  remove(id: number): Observable<Avaliacao> {
    return this.apiService.delete<Avaliacao>(`${this.path}/${id}`);
  }
}
