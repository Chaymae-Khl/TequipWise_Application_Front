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
GetAssetsList(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/user-assets`,httpOptions);
}
NumberOfRequest(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/GetRequestCount`,httpOptions);
}
getRequestOfDepartement(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/DepartmentRequests`,httpOptions);
}

//Approval method
Aproval(equipmentRequestId:any,subRequestId:any,Response:any){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Request/${equipmentRequestId}/subrequests/${subRequestId}`,Response,httpOptions);
}
AdminAproval(equipmentRequestId:any,subRequestId:any,Response:any){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Request/${equipmentRequestId}/Adminsubrequests/${subRequestId}`,Response,httpOptions);
}




uploadSupplierOffer(requestId: any, updatedRequest: any, file: File): Observable<any> {
  console.log(file)

  const formData = new FormData();
  formData.append('equipmentRequestId', requestId.toString());
  formData.append('file', file);
  formData.append('updatedRequestJson', JSON.stringify(updatedRequest));  // Convert the updatedRequest to a JSON string

  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Request/ItOfferAndPrice/${requestId}`, formData, httpOptions);
}
//for the KPIs
MonthlyExpenditure(year:any){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/monthly-expenditure?year=${year}`,httpOptions);
}
getRequestCounts(): Observable<any> {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Request/counts`,httpOptions);
}
}

