import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})
export class OpenDataServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = environment.apiUrl;
  getPlantsWDept(){
    return this.httpClient.get(`${this.apiUrl}/OpenData/Plants`);
  }
}
