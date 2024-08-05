import { Component } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageServiceService } from '../../../Services/local-storage-service.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  visible: boolean = false;
  email: any;
  isPasswordVisible: boolean = false;
  loadingPasswordEmail: boolean = false; // Loading flag for password email operation
  loading:any;
  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }


  loginData: any = {
    username: null,
    password: null
  };
  constructor(private authService: AuthServiceService, private router: Router, private localstorgeService: LocalStorageServiceService, private messageService: MessageService) { }
  showDialog() {
    this.visible = true;
  }


  //login function

  onSubmit(form: NgForm) {
    this.loading = true;
    const loginData = {
      username: form.value.username,
      password: form.value.password
    };
    this.authService.login(loginData).subscribe(
      (response: any) => {
        const localStorage = document.defaultView?.localStorage;
        this.loading = false;
        // Handle successful login response
        if (localStorage){
          this.localstorgeService.setItem('token', response.token);
        console.log(response.token);
       
        }
        this.router.navigate(['/Menu']);
        

      },
      error => {
        this.loading = false;
        // Handle error
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Te identifier or Password Incorrect', life: 10000 });
        console.error('Login error:', error);
      }
    );
  }

  //sendemail function
  passwordEmail() {
    this.loadingPasswordEmail = true; // Set loading flag to true
    this.authService.SendForgetPasswordEmail(this.email).subscribe(
      (response) => {
        console.log('Reset link sent successfully:', response);
        this.visible = false;
        this.messageService.add({ severity: 'info', summary: 'Info', detail: 'An Email was sent to your MailBox', life: 15000 });
        this.loadingPasswordEmail = false; // Set loading flag to false on success
      },
      (error) => {
        console.error('Error sending reset link:', error);
        this.loadingPasswordEmail = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 15000 });

        // Handle error (e.g., show an error message)
      }
    );
  }


}
