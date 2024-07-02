import { Component } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { User } from '../../../Models/user';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
  activeIndex: number = 0;
  Authenticated: any = {};
  locations: any;
  selectedLocation: any; // Store only the location of the selected plant
  plantsOfSelectedLocation: any[] = [];
  departmentsOfSelectedPlant: any[] = [];
  Roles: any;
  users: any;
  loading: boolean = false;
  user: User = new User();
  newPassword: any;
  confirmPassword: any;
  passwordMismatch: boolean = false;
  constructor(private authservice: AuthServiceService, private openDataService: OpenDataServiceService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUsers();
    this.getAuthUseer();
    this.getLocations();
   
  }
  getAuthUseer() {
    this.authservice.getAuthuser().subscribe(
      (data) => {
        this.Authenticated = data;
        this.user = this.mapAuthenticatedToUser(this.Authenticated);
        console.log(this.Authenticated);
      }
    )
  }
  private mapAuthenticatedToUser(authenticated: any): User {
    this.user.id = authenticated.id;
    this.user.teNum = authenticated.teNum;
    this.user.userName = authenticated.userName;
    this.user.backupaprover_Name = authenticated.backupaprover_Name;
    this.user.managerName = authenticated.managerName;
    this.user.email = authenticated.email;
    this.user.locationID = authenticated.location.locationId;
    this.user.backupActive = authenticated.backupActive;
    this.user.approverActive = authenticated.approverActive;
    this.user.locationName = authenticated.locationName;
    this.user.plant_name = authenticated.plant_name;
    this.user.roles = authenticated.roles;
    this.user.DeptId = authenticated.department.deptId;
    this.user.departmentName = authenticated.departmentName;
    this.user.location = authenticated.location;
    return this.user;
  }
  getLocations() {
    this.openDataService.getPlantsWDept().subscribe(
      (data) => {
        this.locations = data;
        // If there is a preselected location, update the plants and departments.
        if (this.Authenticated && this.Authenticated.locationName) {
          this.onLocationChange({ value: this.Authenticated.locationName });
        }
      },
      (error) => {
        console.error('An error occurred while fetching plants:', error);
      }
    );
  }

  onLocationChange(event: any) {
    const selectedLocationName = event.value;
    // Find the selected location object based on the location name.
    const selectedLocation = this.locations.find((location: any) => location.locationName === selectedLocationName);

    if (selectedLocation) {
      // Update the plants and departments based on the selected location.
      this.plantsOfSelectedLocation = selectedLocation.plants;
      this.departmentsOfSelectedPlant = selectedLocation.departments;
    } else {
      // If no location is selected, clear the plants and departments.
      this.plantsOfSelectedLocation = [];
      this.departmentsOfSelectedPlant = [];
    }
  }
  //get roles method
 
  onApproverActiveChangeBackup() {
    if (!this.Authenticated.backupActive) {
      this.Authenticated.backupaprover_Name = this.Authenticated.backupaprover_Name;
    }
  }
  getUsers() {
    this.authservice.getUsersforprofile().subscribe(
      (data) => {
        this.users = data;
        console.log(this.users);
      },
      (error) => {
        console.error('An error occurred while fetching Users:', error);
        console.log('Error response:', error.error); // Log the response object
      }
    );
  }

  updateUser(): void {
    this.loading = true; 
        this.authservice.updateProfile(this.user, this.user.id).subscribe(
          () => {
            
            this.loading = false;
            // this.closeModal();
            this.messageService.add({severity:'success', summary: 'Success', detail: 'User updated successfully',life: 10000});
           
            console.log(`User updated successfully.`);
          },
          (error) => {
            this.loading = false;
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User update failed',life: 10000 });
            console.error('Error updating user:', error);
          }
        );
      }
    
  
  
  
  // Function to handle password change
  changePassword(data: { userId: any; newPassword: any }): void {
    const { userId, newPassword } = data;

    if (userId && newPassword) {
      this.authservice.updatePasswordProfile(userId, newPassword).subscribe(
        () => {
          this.newPassword = '';
          this.confirmPassword = '';
          // this.closeModal(); // Close modal after successful password update
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Password updated successfully',
            life: 10000,
          });

          console.log(`Password updated successfully.`);
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Password update failed',
            life: 10000,
          });
          console.error('Error updating the password:', error);
        }
      );
    } else {
      console.error('Invalid userId or newPassword provided.');
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Invalid userId or newPassword provided',
        life: 10000,
      });

      // Handle error (e.g., show error message)
    }
  }

  // Function to handle the password change form submission
  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.passwordMismatch = true;
    } else {
      this.passwordMismatch = false;
      this.changePassword({
        userId: this.Authenticated.id,
        newPassword: this.newPassword,
      });
    

    }
  }
}
