import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LocalStorageServiceService } from './local-storage-service.service';
import { MaintenanceRequest } from '../Models/maintenance-request';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceServiceService {
  apiUrl = environment.apiUrl;
  
  token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
 
constructor(private httpClient:HttpClient,private localstorgeService:LocalStorageServiceService ) {
}
 // Helper function to update HTTP headers with the current token
 private getHttpOptions(): { headers: HttpHeaders } {
  const token = this.localstorgeService.getItem('token');
  return {
    headers: new HttpHeaders({
      
      'Authorization': token ? `Bearer ${token}` : ''
    })
  };
}

PassRequest(newRequest:MaintenanceRequest,file: File){
  const formData = new FormData();

  // Append individual properties of newRequest to FormData
  Object.keys(newRequest).forEach(key => {
    const value = (newRequest as any)[key];
    if (value !== undefined && value !== null) {
      formData.append(key, value.toString());
    }
  });

  // Append the file
  if (file) {
    formData.append('file', file);
  }

  const httpOptions = this.getHttpOptions();
  return this.httpClient.post(`${this.apiUrl}/Maintenance/PassMaintenanceRequest`, formData, httpOptions);
}

getUsers() {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Maintenance/Users`, httpOptions);
}

getALlSupliers(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Maintenance/Suppliers`, httpOptions);
}

getRequests(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Maintenance/DepartmentRequests`,httpOptions);
}
}
