import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { ElementRef, Renderer2 } from '@angular/core';
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
  plants: any;
  selectedLocation: any; // Store only the location of the selected plant
  selectedPlant: any; // Store the entire selected plant object
  message:any;
  constructor(private openDataServiceService: OpenDataServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private snackBar: MatSnackBar) { }

    ngOnInit(): void {
      this.getPlants();
    }


    //GetPlants method
    getPlants(){
      this.openDataServiceService.getPlantsWDept().subscribe(
        (data) => {
          this.plants = data;
        },
        (error) => {
          console.error('An error occurred while fetching plants:', error);
          console.log('Error response:', error.error); // Log the response object
        }
      );
    }

    //to get the department associed to the plant
    onPlantChange(event: any) {
      this.selectedPlant = event.value;
      if (this.selectedPlant) {
        console.log('Plant selected');
      } else {
        this.selectedPlant = null; // Reset selectedPlant if no plant is selected
        console.log('No plant selected.');
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
      const role = 'User'; 
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
