import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {


  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

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
  isTokenExpired(token: string): boolean { // Accepts token as an argument
    if (!token) {
      return true;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp;
      // console.log(expiry);
      const now = Math.floor(Date.now() / 1000);
      // console.log(now);

      return now > expiry;
    } catch (e) {
      return true; // Assume expired if there's an error parsing the token
    }
  }

  async checkTokenExpiry(): Promise<boolean> { // New method to handle token check without argument
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




}
