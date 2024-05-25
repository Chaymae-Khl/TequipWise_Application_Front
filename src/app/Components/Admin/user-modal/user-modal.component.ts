import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../../Models/user';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
import { AuthServiceService } from '../../../Services/auth-service.service';


@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrl: './user-modal.component.css',
})
export class UserModalComponent implements OnInit{
  @Input() user:User= new User();
  @Input() mode!: 'view' | 'update' |'changepassword'; // Mode to control the behavior of the modal
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() updateUser: EventEmitter<User> = new EventEmitter<User>();
  @Output() changePassword: EventEmitter<{ userId: any, newPassword: any }> = new EventEmitter<{ userId: any, newPassword: any }>();
  @Input() userId: any;
  locations: any;
  selectedLocation: any; // Store only the location of the selected plant
  plantsOfSelectedLocation: any[] = [];
  departmentsOfSelectedPlant: any[] = [];
  Roles:any;
  locationed:User =new User();
  mylocation:any;
  newPassword: any;
  confirmPassword:any;
  users:any;
  isPasswordVisible: boolean = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  constructor(private openDataService: OpenDataServiceService,private authservice:AuthServiceService) { }

  ngOnInit() {
    this.getLocations();
    this.getRoles();
    this.getuasersname();
   
  }

//getusersNames
getuasersname(){
  this.authservice.getUsers().subscribe(
    (data) => {
      this.users = data;
      console.log(this.users);
    },
    (error) => {
      console.error('An error occurred while fetching Users:', error);
      console.log('Error response:', error.error); // Log the response object
    })
}


    //getLocations method
    getLocations(){
      this.openDataService.getPlantsWDept().subscribe(
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
  const selectedLocationName = event.value;
  const selectedLocation = this.locations.find((location:any) => location.locationName === selectedLocationName);

  if (selectedLocation) {
    this.plantsOfSelectedLocation = selectedLocation.plants;
    this.departmentsOfSelectedPlant = selectedLocation.departments;
  
  } else {
    this.selectedLocation = null; // Reset selectedLocation if no location is selected
    this.plantsOfSelectedLocation = []; // Clear the plants
    this.departmentsOfSelectedPlant = []; // Clear the departments
    console.log('No location selected.');
  }

}
  




  //get roles method
getRoles(){
  this.authservice.getRoles().subscribe(
    (data) => {
      this.Roles = data;
      console.log(this.Roles);
    },
    (error) => {
      console.error('An error occurred while fetching roles:', error);
      console.log('Error response:', error.error); // Log the response object
    }
  );

}


  onClose(): void {
    this.closeModal.emit();
  }

  onUpdateUser(): void {
    this.updateUser.emit(this.user);
 
  }

  onChangePassword(): void {
    if (this.newPassword === this.confirmPassword && this.userId) {
      this.changePassword.emit({ userId: this.userId, newPassword: this.newPassword });
    } else {
      console.error('Passwords do not match or userId is missing.');
      // Handle error condition
    }
  }
  
  
  
  
  }
