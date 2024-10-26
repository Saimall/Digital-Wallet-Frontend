import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true; // User is authenticated
    }
    
    // Redirect to login if not authenticated
    this.router.navigate(['/login']);
    return false;
  }
}
