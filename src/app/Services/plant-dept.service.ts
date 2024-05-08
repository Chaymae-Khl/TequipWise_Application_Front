import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { Plant } from '../Models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantDeptService {
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

AddNewPlant(plantdata:Plant){
  return this.httpClient.post(`${this.apiUrl}/Admin/AddPlant`, plantdata);
}

}
