import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Role } from '../interfaces/usuario';

export const avaliacaoGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isAdmin() || auth.hasRole(Role.AVALIACAO);
};
