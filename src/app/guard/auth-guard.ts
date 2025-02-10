import {inject, Injectable} from '@angular/core';
import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data?.['roles'] as string;
  console.log('ROLES' + requiredRoles);

  if (requiredRoles && !authService.hasRole(requiredRoles)) {
    router.navigate(['/acesso-negado']);
    return false;
  }

  return true;
};
