import { CanActivateFn } from '@angular/router';
//npm install jwt-decode,
//ng generate service auth
//>ng generate guard auth
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/authenticationservice/authservice.service';

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
    
    this.router.navigate(['']);
    return false;
  }
}
