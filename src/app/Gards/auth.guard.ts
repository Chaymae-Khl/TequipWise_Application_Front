import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageServiceService } from '../Services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private localstorgeService:LocalStorageServiceService ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    
    const token = await this.localstorgeService.getItem('token');

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