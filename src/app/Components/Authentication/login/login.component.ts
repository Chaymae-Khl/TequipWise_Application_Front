import { Component } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { log } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginData: any = {
    username: null,
    password: null
  };
constructor(private authService: AuthServiceService, private router: Router,private snackBar: MatSnackBar){}
onSubmit(form: NgForm) {
  const loginData = {
    username: form.value.username,
    password: form.value.password
  };
  this.authService.login(loginData).subscribe(
    (response:any) => {
      // Handle successful login response
      console.log(response.token);
      const token=response.token;
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);
      console.log(decodedToken);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      console.log('User role:', role);
      localStorage.setItem('token',response.token);

   if(role==="Admin"){
    this.router.navigate(['/dashboard']);
   } 
   else{
    console.log("your are not admin.");
   }


    },
    error => {
      // Handle error
      console.error('Login error:', error);
    }
  );
}
}
