import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { ElementRef, Renderer2 } from '@angular/core';
import jQuery from 'jquery';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
const $ = jQuery;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
 
})

export class RegisterComponent implements OnInit{
 
 user=new User;
 plants: any;
 selectedLocation: any; // Store only the location of the selected plant
 selectedPlant: any; // Store the entire selected plant object
 constructor(private openDataServiceService:OpenDataServiceService,
            private authService:AuthServiceService,
            private router:Router,
            private renderer: Renderer2,
            private elementRef: ElementRef) {}
            ngOnInit(): void {
              this.openDataServiceService.getPlantsWDept().subscribe(
                (data) => {
                  // Assuming data is directly the array of plants
                  this.plants = data;
                  console.log(this.plants); // Just for testing, you can remove this line
                },
                (error) => {
                  console.error('An error occurred while fetching plants:', error);
                  // You can also display a user-friendly error message or handle the error in other ways
                }
              );
            }
onPlantChange(event: any) {
  this.selectedLocation = event.target.value;
  // Find the selected plant object based on the selected location
  this.selectedPlant = this.plants.find((plant: { location: any; }) => plant.location === this.selectedLocation);
}

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
    console.log(this.user);
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

















//Form Animations code 
  animating: boolean = false;
  ngAfterViewInit(): void {
    // Select all elements with the class 'next' and 'previous'
    const nextButtons = this.elementRef.nativeElement.querySelectorAll('.next');
    const previousButtons = this.elementRef.nativeElement.querySelectorAll('.previous');
    
    // Convert the NodeLists to arrays using Array.from with type assertion
    const nextButtonsArray = Array.from(nextButtons) as HTMLElement[];
    const previousButtonsArray = Array.from(previousButtons) as HTMLElement[];
  
    // Check if any elements with class 'next' were found
    if (nextButtonsArray.length > 0) {
      // Iterate over the array of next buttons and add event listeners
      nextButtonsArray.forEach((button: HTMLElement) => {
        this.renderer.listen(button, 'click', () => this.nextClickHandler(button));
      });
    } else {
      console.error("No elements with class 'next' found.");
    }
  
    // Check if any elements with class 'previous' were found
    if (previousButtonsArray.length > 0) {
      // Iterate over the array of previous buttons and add event listeners
      previousButtonsArray.forEach((button: HTMLElement) => {
        this.renderer.listen(button, 'click', () => this.previousClickHandler(button));
      });
    } else {
      console.error("No elements with class 'previous' found.");
    }
  }

  nextClickHandler(button: HTMLElement): void {
    if (this.animating) return;
    this.animating = true;
  
    const current_fs = button.parentElement as HTMLElement;
    const next_fs = current_fs ? current_fs.nextElementSibling as HTMLElement : null;
  
    if (!current_fs || !next_fs) return;
  
    current_fs.style.display = 'none';
    next_fs.style.display = 'block';
  
    // Update progress bar
    const currentStep = document.querySelector('#progressbar .active');
    const nextStep = currentStep ? currentStep.nextElementSibling as HTMLElement : null;
    if (nextStep) {
      currentStep?.classList.remove('active');
      nextStep.classList.add('active');
    }
  
    this.animating = false;
  }

  previousClickHandler(button: HTMLElement): void {
    if (this.animating) return;
    this.animating = true;
  
    const current_fs = button.parentElement as HTMLElement;
    const previous_fs = current_fs ? current_fs.previousElementSibling as HTMLElement : null;
  
    if (!current_fs || !previous_fs) return;
  
    current_fs.style.display = 'none';
    previous_fs.style.display = 'block';
  
    // Update progress bar
    const currentStep = document.querySelector('#progressbar .active');
    const previousStep = currentStep ? currentStep.previousElementSibling as HTMLElement : null;
    if (previousStep) {
      currentStep?.classList.remove('active');
      previousStep.classList.add('active');
    }
  
    this.animating = false;
  }













  

}
