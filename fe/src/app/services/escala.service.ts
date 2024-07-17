import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Escala } from '../interfaces/escala';

@Injectable({
  providedIn: 'root'
})
export class EscalaService {
  private readonly path = 'escala';

  constructor(private apiService: ApiService) {}

  findAll(): Observable<Escala[]> {
    return this.apiService.get<Escala[]>(this.path, {});
  }
}
