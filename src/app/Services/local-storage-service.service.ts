import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  private jwtHelper: JwtHelperService;
  apiUrl = environment.apiUrl;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) { 
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
  refreshToken(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/Auth/refresh-token`, {});
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

  checkTokenExpiration() {
    const expirationDate = new Date(localStorage.getItem('tokenExpiration')!);
    if (expirationDate <= new Date()) {
      return true;
    }
    return false;
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
    const isDeptManager = roles.includes('Manager');    
    return of(isDeptManager);
  }
  IsBackupApprover(Token: any): Observable<boolean> {
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
    const isBackup = roles.includes('BackupApprover');    
    return of(isBackup);
  }
  IsItApprover(Token: any): Observable<boolean> {
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
    const isItApprover = roles.includes('It Approver');    
    return of(isItApprover);
  }
  IsController(Token: any): Observable<boolean> {
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
    const IsController = roles.includes('Controller');    
    return of(IsController);
  }


}
