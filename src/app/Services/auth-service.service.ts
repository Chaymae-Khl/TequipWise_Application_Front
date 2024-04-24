import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment
import { data } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient:HttpClient) { }
  apiUrl = environment.apiUrl;
//Register
UserRegister(data: User, role: string){
  // Construct the URL with the role parameter
  const url = `${this.apiUrl}/Auth/Register?role=${role}`;
  // Make the POST request with the URL and user data
  return this.httpClient.post(url, data);
}

//login

login(loginData: any) {
  return this.httpClient.post(`${this.apiUrl}/Auth/Login`, loginData);
}
}
