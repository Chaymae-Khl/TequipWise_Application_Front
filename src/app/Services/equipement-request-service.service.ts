import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { EquipmentRequest } from '../Models/equipment-request';
import { Observable } from 'rxjs';

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

updateRequest(requestToUpdate:EquipmentRequest){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Request/UpdateEquipemntRequest`,requestToUpdate,httpOptions);
}

uploadSupplierOffer(requestId: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('requestId', requestId.toString());
  formData.append('file', file);

  const httpOptions = this.getHttpOptions();
  return this.httpClient.post(`${this.apiUrl}/Request/UploadSupplierOffer`, formData, httpOptions);
}

}

