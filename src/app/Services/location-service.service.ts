import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageServiceService } from './local-storage-service.service';
import { Observable } from 'rxjs';
import { Location } from '../Models/location';
import { Plant } from '../Models/plant';
import { Department } from '../Models/department';

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

//location&Plant

addPlantToLocation(id:any,data:any){
  return this.httpClient.post(`${this.apiUrl}/Admin/add-plant-to-location/${id}`,data,this.httpOptions);
}

DeletePlantFromLocation(locationId:any,plantId:any){
  return this.httpClient.delete(`${this.apiUrl}/Admin/DeletePlantofLocation/${locationId}/plants/${plantId}`,this.httpOptions);
}

UpdatePlantOfLocation(locationid:any,plantId:any,data:Plant){
  return this.httpClient.put(`${this.apiUrl}/Admin/updatePlantLocation/${locationid}/plants/${plantId}`,data,this.httpOptions);
}


//location&departement
addDepartementToLoaction(locationid:any,data:Department){
  return this.httpClient.post(`${this.apiUrl}/Admin/add-departement-to-location/${locationid}`,data,this.httpOptions);
}
UpdateDeptOfLocation(locationid:any,deptId:any,data:Department){
  return this.httpClient.put(`${this.apiUrl}/Admin/updateDepartmentLocation/${locationid}/Department/${deptId}`,data,this.httpOptions);
}


getPlants(){
  return this.httpClient.get(`${this.apiUrl}/Admin/Plants`,this.httpOptions);
}

getDepartments(){
  return this.httpClient.get(`${this.apiUrl}/Admin/Departments`,this.httpOptions);
}


}
