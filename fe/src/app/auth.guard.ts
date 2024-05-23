import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = async () => {
  const router = inject(Router);
  const auth = inject(AuthService);
  const user = await auth.getUser();
  if (!user || !auth.isAuthorized()) {
    router.navigate(['login']);
    return false;
  }
  return true;
};
