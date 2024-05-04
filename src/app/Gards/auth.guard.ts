import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) {
      // User is authenticated, allow route activation
      return true;
    } else {
      // User is not authenticated, navigate to authentication page and deny route activation
      this.router.navigate(['/login']);
      return false;
    }
  }
}