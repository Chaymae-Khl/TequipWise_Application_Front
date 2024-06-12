import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { EquipmentRequest } from '../Models/equipment-request';

@Injectable({
  providedIn: 'root'
})
export class EquipementRequestServiceService {
  apiUrl = environment.apiUrl;
  
  token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
 
constructor(private httpClient:HttpClient,private localstorgeService:LocalStorageServiceService ) {
}
 // Helper function to update HTTP headers with the current token
 private getHttpOptions(): { headers: HttpHeaders } {
  const token = this.localstorgeService.getItem('token');
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    })
  };
}

PassRequest(newRequest:EquipmentRequest){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.post(`${this.apiUrl}/Request/PassEquipemntRequest`,newRequest,httpOptions);
}

GetAuthRequestList(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/GetUserRequests`,httpOptions);
}
NumberOfRequest(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/GetUserRequestCount`,httpOptions);
}
getRequestOfDepartement(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/DepartmentRequests`,httpOptions);
}
}
