import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  private jwtHelper: JwtHelperService;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    this.jwtHelper = new JwtHelperService();
  }

  getItem(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  async getToken(): Promise<string | null> {
    return this.getItem('token');
  }
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  async checkTokenExpiry(): Promise<boolean> {
    const token = await this.getToken();
    console.log(token);
    return this.isTokenExpired(token!);
  }


  IsAdmin(Token: any): Observable<boolean> {

    if (!Token) {
      return of(false); // Return false (not admin)
    }
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(Token);
    const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const isAdmin = role === 'Admin';
    return of(isAdmin);
  }

  IsManger(Token: any): Observable<boolean> {
    if (!Token) {
      return of(false); // Return false (not authenticated)
    }
  
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(Token);
  
    let roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    
    // Convert roles to an array if it's not already one
    if (!Array.isArray(roles)) {
      roles = [roles];
    }
  
    // Check if 'DeptManager' role exists in the roles array
    const isDeptManager = roles.includes('DeptManager');    
    return of(isDeptManager);
  }


}
