import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  if (user && user.role === 'admin') {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
