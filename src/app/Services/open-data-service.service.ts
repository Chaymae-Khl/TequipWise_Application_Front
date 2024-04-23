import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenDataServiceService {

  constructor(private httpClient:HttpClient) { }

  getPlantsWDept(){
    return this.httpClient.get('https://localhost:7171/api/OpenData/Plants');
  }
}
