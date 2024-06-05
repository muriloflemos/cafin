import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Usuario, Role, UsuarioRole } from '../interfaces/usuario';
import { ApiService } from './api.service';

export type AuthToken = {
  access_token: string;
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage;
  private _user: Usuario | null = null;

  constructor(private apiService: ApiService) {
    this.storage = window.localStorage;
  }

  registerToken(token: string): void {
    this.storage.setItem('token', token);
  }

  unregisterToken(): void {
    this.storage.clear();
  }

  getToken(): string | null {
    return this.storage.getItem('token');
  }

  isAuthorized(): boolean {
    return this.storage.getItem('token') != null;
  }

  login(email: string, senha: string): Observable<AuthToken> {
    const body = {
      email,
      senha,
    };
    return this.apiService.post('auth/login', body);
  }

  logout(): void {
    this.unregisterToken();
    this._user = null;
  }

  profile(): Observable<Usuario> {
    return this.apiService.get<Usuario>('auth/profile');
  }

  getUser(): Promise<Usuario | null> {
    return new Promise((resolve) => {
      if (this._user) {
        resolve(this._user);
      } else {
        this.profile().subscribe({
          next: (usuario: Usuario) => {
            this._user = usuario;
            resolve(this._user);
          },
          error: () => {
            resolve(null);
          },
        })
      }
    });
  }

  isAdmin(): boolean {
    return this._user ? this.hasUserRole(this._user.roles, Role.ADMIN) : false;
  }

  hasRole(role: Role): boolean {
    return this._user ? this.hasUserRole(this._user.roles, role) : false;
  }

  private hasUserRole(userRoles: UsuarioRole[], role: Role): boolean {
    const index = userRoles.findIndex((userRole: UsuarioRole) => userRole.role === role);
    return index >= 0;
  }
}
