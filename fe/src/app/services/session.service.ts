import { Injectable } from '@angular/core';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private storage: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  setAniversariantes(clientes: Cliente[]): void {
    this.storage.setItem('clientes', JSON.stringify(clientes));
  }

  getAniversariantes(): Cliente[] {
    let jsonData = this.storage.getItem('clientes');
    if (!jsonData) return [];
    const clientes = JSON.parse(jsonData) as Cliente[];
    return clientes;
  }
}
