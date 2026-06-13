import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const client = localStorage.getItem('client');
  if (client) {
    const clientObj = JSON.parse(client);
    if (clientObj.email === 'jfetsonomerch@gmail.com') {
      return true;
    }
  }
  router.navigate(['/']);
  return false;
};