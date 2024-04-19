import { Component } from '@angular/core';
import { User } from '../../../Models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
 user=new User;

 constructor(private authService:AuthServiceService,private router:Router){}

 Register() {
  let confirmation = window.confirm("Do you really want to add the user?");
  if (confirmation) {
    // Check if email is provided
    if (!this.user.email) {
      alert("Email is required.");
      return; // Exit the method
    }

    // Set the role directly here
    const role = 'Admin'; // Change 'Admin' to the desired role

    // Call the registration service method with both user data and role
    this.authService.UserRegister(this.user, role).subscribe(
      (res) => {
        console.log("Registration successful");
        this.router.navigate(['/login']);
        alert("Data added!");
      },
      (error) => {
        console.error("Error occurred during registration:", error);
        alert("An error occurred during registration. Please try again.");
      }
    );
  }
}
}
