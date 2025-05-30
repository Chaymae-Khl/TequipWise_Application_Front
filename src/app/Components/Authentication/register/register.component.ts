import { Component, OnInit } from '@angular/core';
import { User } from '../../../Models/user';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../../Validators/validators';
import { SapNumberServiceService } from '../../../Services/sap-number-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent  {
  user = new User();
  locations: any;
  plantsOfSelectedLocation: any[] = [];
  departmentsOfSelectedPlant: any[] = [];
  registerForm: FormGroup;
  loading!: boolean  // Initialize as true to show loading initially
  sapnumbers:any;
  constructor(
    private openDataServiceService: OpenDataServiceService,
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private sapnumService:SapNumberServiceService

  ) {
    this.registerForm = this.fb.group({
      teNum: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, CustomValidators.emailPattern]],
      password: ['', [Validators.required, CustomValidators.strongPassword]],
      confirmPassword: ['', Validators.required],
      SapNumberId: [0, Validators.required],
      locationID: [0, Validators.required],
      plantId: [{ value: 0, disabled: true }, Validators.required],
      DeptId: [{ value: 0, disabled: true }, Validators.required],
    }, { validators: CustomValidators.passwordsMatch });
  }

  ngOnInit(): void {
    this.getLocations();
    this.getSapNumber();
    console.log(this.sapnumbers);
  }

  getLocations() {
    this.openDataServiceService.getPlantsWDept().subscribe(
      (data) => {
        this.locations = data;
      },
      (error) => {
        console.error('An error occurred while fetching plants:', error);
      }
    );
  }

  getSapNumber(){
   this.sapnumService.getALSapNum().subscribe(
    (res) => {
      this.sapnumbers=res;
    },
    (error) => {
      
      console.error("Error occurred during fetching data:", error);
    }
  );
  }
  onLocationChange(event: any) {
    const selectedLocationID = event.value;
    const selectedLocation = this.locations.find((location: any) => location.locationId === selectedLocationID);

    if (selectedLocation) {
      this.plantsOfSelectedLocation = selectedLocation.plants;
      this.departmentsOfSelectedPlant = selectedLocation.departments.filter((dept: any) => dept.status); // Filter departments with status=true
      this.registerForm.get('plantId')?.enable();
      this.registerForm.get('DeptId')?.enable();
      this.registerForm.get('SapNumberId')?.enable();

    } else {
      this.plantsOfSelectedLocation = [];
      this.departmentsOfSelectedPlant = [];
      this.registerForm.get('plantId')?.disable();
      this.registerForm.get('DeptId')?.disable();
      this.registerForm.get('SapNumberId')?.disable();

    }
  }

  Register() {
    this.loading = true; 
    if (this.user.password !== this.user.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    const formValues = this.registerForm.value;
    const role = 'User';

    this.authService.UserRegister(formValues, role).subscribe(
      (res) => {
      this.loading = false;
        console.log("Registration successful");
        this.router.navigate(['/login']);
      },
      (error) => {
        this.loading = false;
        console.error("Error occurred during registration:", error);
      }
    );
  }


}
