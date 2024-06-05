import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { Equipment } from '../Models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipementServiceService {

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

getALlEquipements(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/AllEquipements`, httpOptions);
}

AddEquipement(newEquipement:Equipment){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.post(`${this.apiUrl}/Admin/AddEquipment`,newEquipement,httpOptions);
}

DeleteEquipement(id:string){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.delete(`${this.apiUrl}/Admin/DeleteEquipment/${id}`,httpOptions);
}

UpdateEquipement(id:String,equipment:Equipment){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Admin/updateEquipment/${id}`,equipment,httpOptions);
}
getNumberOfEquipements(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/NumberOfEquipment`,httpOptions);
}

getsupplierName(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/SuppliersName`,httpOptions);
}

}
