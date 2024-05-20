import { Inject, Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LocalStorageServiceService } from '../Services/local-storage-service.service';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private localStorageService: LocalStorageServiceService,@Inject(DOCUMENT) private document: Document) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    
    
    
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = '<app-loading></app-loading>';
    document.body.appendChild(loadingElement);

    try {
      const token = await this.localStorageService.getItem('token');

      if (token) {
        // User is authenticated, allow route activation
        return true;
      } else {
        // User is not authenticated, navigate to authentication page and deny route activation
        this.router.navigate(['/login']);
        return false;
      }
    } finally {
      document.body.removeChild(loadingElement);
    }
  }
}