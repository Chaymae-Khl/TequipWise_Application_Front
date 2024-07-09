import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { SapNumber } from '../Models/sap-number';

@Injectable({
  providedIn: 'root'
})
export class SapNumberServiceService {



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

getALSapNum(){
  return this.httpClient.get(`${this.apiUrl}/OpenData/getSapNums` );
}

AddSapNum(newsap:SapNumber){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.post(`${this.apiUrl}/Admin/AddSapNum`,newsap,httpOptions);
}

DeleteSapNum(id:string){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.delete(`${this.apiUrl}/Admin/DeleteSapNum/${id}`,httpOptions);
}

UpdateSapNum(id:String,sap:SapNumber){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Admin/updateSapNum/${id}`,sap,httpOptions);
}



}
