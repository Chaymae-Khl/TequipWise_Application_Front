import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { Supplier } from '../Models/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierServiceService {


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

getALlSupliers(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/Suppliers`, httpOptions);
}

AddSupplier(newSupplier:Supplier){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.post(`${this.apiUrl}/Admin/AddSupplier`,newSupplier,httpOptions);
}

DeleteSupplier(id:string){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.delete(`${this.apiUrl}/Admin/DeleteSupplier/${id}`,httpOptions);
}

UpdateSupplier(id:String,supplier:Supplier){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Admin/updateSupplier/${id}`,supplier,httpOptions);
}
getNumberOfSuppliers(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/numberofsuppliers`,httpOptions);
}
}
