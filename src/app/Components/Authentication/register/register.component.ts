import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../Services/auth-service.service';
import jQuery from 'jquery';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
const $ = jQuery;
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

})

export class RegisterComponent  {

  user = new User;
  locations: any;
  selectedLocation: any; // Store only the location of the selected plant
  plantsOfSelectedLocation: any[] = [];
  departmentsOfSelectedPlant: any[] = [];

  selectedPlant: any; // Store the entire selected plant object
  message:any;
  constructor(private openDataServiceService: OpenDataServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.getLocations();
    }


    //getLocations method
    getLocations(){
      this.openDataServiceService.getPlantsWDept().subscribe(
        (data) => {
          this.locations = data;
          console.log(this.locations);
        },
        (error) => {
          console.error('An error occurred while fetching plants:', error);
          console.log('Error response:', error.error); // Log the response object
        }
      );
    }

// Handle location change
onLocationChange(event: any) {
  this.selectedLocation = event.value;
  if (this.selectedLocation) {
    this.plantsOfSelectedLocation = this.selectedLocation.plants;
    this.departmentsOfSelectedPlant =this.selectedLocation.departments;
    console.log('Location selected');
  } else {
    this.selectedLocation = null; // Reset selectedLocation if no location is selected
    this.plantsOfSelectedLocation = []; // Clear the plants
    console.log('No location selected.');
  }
}


  //Register method
  Register() {
   
    if (this.user.password !== this.user.confirmPassword) {
      // Passwords don't match, display a popup message
      this.snackBar.open('Passwords do not match', 'Close', {
        duration: 5000, // Duration the snackbar should be displayed (in milliseconds)
        horizontalPosition: 'center', // Change horizontal position
        verticalPosition: 'top', // Change vertical position
      });
      return;
    }
      // Set the role directly here
      const role = 'Admin'; 
      console.log(this.user);
      // Call the registration service method with both user data and role
      this.authService.UserRegister(this.user, role).subscribe(
        (res) => {
          console.log("Registration successful");
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error("Error occurred during registration:", error);
        }
      );
    }
  
  














}
