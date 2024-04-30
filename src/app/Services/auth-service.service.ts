import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

  apiUrl = environment.apiUrl;
  
  token = typeof window !== 'undefined' && window.localStorage ? localStorage.getItem('token') : null;
 
constructor(private httpClient:HttpClient) { 
}
 // Helper function to update HTTP headers with the current token
 private getHttpOptions(): { headers: HttpHeaders } {
  const token = localStorage.getItem('token');
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    })
  };
}


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
//logout 

logout(): void {
  // Clear token from localStorage
  localStorage.removeItem('token');
  this.token = null;
}


 // Get list of users
 getUsers() {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/Users`, httpOptions);
}

// Delete user by ID
deleteUser(id: any) {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.delete(`${this.apiUrl}/Admin/DeleteUser/${id}`, httpOptions);
}

// Update user by ID
updateUser(data: any, id: any) {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Admin/update/${id}`, data, httpOptions);
}

}
