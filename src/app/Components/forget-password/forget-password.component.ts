import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../Services/auth-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent {
  constructor(private http: HttpClient, private router: Router,private authService: AuthServiceService) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { email, password, Confirmpassword } = form.value;
    const token = this.getTokenFromUrl();
    // console.log(token);
    if (password !== Confirmpassword) {
      alert("Passwords do not match");
      return;
    }
    const forgotPasswordModel = {
      Email: email,
      Password: password,
      Token: token,
      ConfirmPassword:Confirmpassword
    };
    this.authService.ResetPassword(forgotPasswordModel).subscribe(
      (response: any) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log("Error resiting the password");
      }

    );
  }
  private getTokenFromUrl(): string {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token') || '';
    
  }
}
