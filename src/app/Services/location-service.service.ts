import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { Observable } from 'rxjs';
import { Location } from '../Models/location';

@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {
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
httpOptions = this.getHttpOptions();


addLocation(location: Location): Observable<any> {
  
  return this.httpClient.post(`${this.apiUrl}/Admin/AddLocation`, location,this.httpOptions);
}

DeleteLocation(id: any){
  
  return this.httpClient.delete(`${this.apiUrl}/Admin/DeleteLOcation/${id}`,this.httpOptions);
}

addPlantToLocation(id:any,data:any){
  return this.httpClient.post(`${this.apiUrl}/Admin/add-plant-to-location/${id}`,data,this.httpOptions);
}




getPlants(){
  return this.httpClient.get(`${this.apiUrl}/Admin/Plants`,this.httpOptions);
}

getDepartments(){
  return this.httpClient.get(`${this.apiUrl}/Admin/Departments`,this.httpOptions);
}


}
