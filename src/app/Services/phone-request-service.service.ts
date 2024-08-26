import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { PhoneRequest } from '../Models/phone-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneRequestServiceService {
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
PassRequest(newRequest:PhoneRequest){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.post(`${this.apiUrl}/PhoneRequest/PassPhoneRequest`,newRequest,httpOptions);
}
GetPhoneRequestForAuthUser(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/PhoneRequest/GetUserPhoneRequests`,httpOptions);

}
getRequestOfApprovers(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/PhoneRequest/ApproversRequests`,httpOptions);
}
Aproval(phoneRequestId:any,Response:any){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.patch(`${this.apiUrl}/PhoneRequest/UpdatePhoneRequest/${phoneRequestId}`,Response,httpOptions);
}
AprovalAdmin(phoneRequestId:any,Response:any){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.patch(`${this.apiUrl}/PhoneRequest/UpdatePhoneRequestAdmin/${phoneRequestId}`,Response,httpOptions);
}
GetPhonesList(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/PhoneRequest/user-phones`,httpOptions);
}
getRequestCounts(): Observable<any> {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/PhoneRequest/GetPhoneRequestCount`,httpOptions);
}
getPhoneRequestCounts(): Observable<any> {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/PhoneRequest/counts`,httpOptions);
}
}
