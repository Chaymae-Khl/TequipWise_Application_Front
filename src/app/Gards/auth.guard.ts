import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Resolve, MaybeAsync } from '@angular/router';
import { LocalStorageServiceService } from '../Services/local-storage-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements Resolve<boolean> {
  constructor(private localStorageService: LocalStorageServiceService) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const token = await this.localStorageService.getItem('token');
    return !!token; // Return true if token exists, false otherwise
  }

}