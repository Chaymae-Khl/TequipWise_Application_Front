import { Component } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { NgForm } from '@angular/forms';

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
constructor(private authService: AuthServiceService){}
onSubmit(form: NgForm) {
  const loginData = {
    username: form.value.username,
    password: form.value.password
  };
  this.authService.login(loginData).subscribe(
    (response:any) => {
      // Handle successful login response
      localStorage.setItem('token',response.token);
      console.log('Logged in successfully:', response);
      // Redirect or perform any other action upon successful login
      const token = response.token;
      
    },
    error => {
      // Handle error
      console.error('Login error:', error);
    }
  );
}
}
