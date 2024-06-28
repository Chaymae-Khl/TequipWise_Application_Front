import { Injectable } from '@angular/core';
import { User } from '../Models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; // Import environment
import { LocalStorageServiceService } from './local-storage-service.service';

@Injectable({
  providedIn: 'root'
})


export class AuthServiceService {

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

isAuthenticated(): boolean {
  const token = this.localstorgeService.getItem('token');
  // Check if the token exists and is valid
  if (token) {
    // Here you can add additional checks for token validity if needed
    return true;
  }
  return false;
}





//Register
UserRegister(data: any, role: string){
  // Construct the URL with the role parameter
  const url = `${this.apiUrl}/Auth/Register?role=${role}`;
  // Make the POST request with the URL and user data
  return this.httpClient.post(url, data);
}

//login

login(loginData: any) {
  return this.httpClient.post(`${this.apiUrl}/Auth/Login`, loginData);
}

//send password link
SendForgetPasswordEmail(Email:any){
  return this.httpClient.post(`${this.apiUrl}/Auth/tokenEmail?Email=${Email}`,{})
}



//resetpassword function
ResetPassword(data: any){
  return this.httpClient.post(`${this.apiUrl}/Auth/reset-password`,data)
}


//updatePassword
updatePassword(userId: any, newPassword: any) {
  const httpOptions = this.getHttpOptions();
  //here the server side is expecting a data type String, but the client send it as json so we use JSON.stringify to convert newPassword into a string enclosed in double quotes.
  return this.httpClient.post(`${this.apiUrl}/Admin/updatePassword/${userId}`, JSON.stringify(newPassword), httpOptions);
}

//updatePassword
updatePasswordProfile(userId: any, newPassword: any) {
  const httpOptions = this.getHttpOptions();
  //here the server side is expecting a data type String, but the client send it as json so we use JSON.stringify to convert newPassword into a string enclosed in double quotes.
  return this.httpClient.post(`${this.apiUrl}/User/updatePasswordProfile/${userId}`, JSON.stringify(newPassword), httpOptions);
}

//logout 

logout(): void {
  // Clear token from localStorage
  localStorage.removeItem('token');
  this.token = null;
}

//USERS MANAGMENT
 // Get list of users
 getUsers() {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/Users`, httpOptions);
}

//get number ofusers
getNumUsers(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/numberofusers`, httpOptions);
}

// Delete user by ID
deleteUser(id: any) {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.delete(`${this.apiUrl}/Admin/DeleteUser/${id}`, httpOptions);
}

// Update user by ID
updateUser(data: User, id: any) {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/Admin/update/${id}`, data, httpOptions);
}

// Update profile by ID
updateProfile(data: User, id: any) {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.put(`${this.apiUrl}/User/updateProfile/${id}`, data, httpOptions);
}

//get roles
getRoles() {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/Admin/allRoles`, httpOptions);
}

//get autheticated user

getAuthuser(){
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/User/GetAuthenticatedUser`, httpOptions);
}

//getusers for my profile
// Get list of users
getUsersforprofile() {
  const httpOptions = this.getHttpOptions();
  return this.httpClient.get(`${this.apiUrl}/User/Users`, httpOptions);
}
}
