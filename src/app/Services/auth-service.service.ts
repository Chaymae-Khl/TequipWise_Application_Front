import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private httpClient:HttpClient) { }

//Register
UserRegister(data: User, role: string){
  // Construct the URL with the role parameter
  const url = `https://localhost:7171/api/Auth/Register?role=${role}`;
  // Make the POST request with the URL and user data
  return this.httpClient.post(url, data);
}
}
