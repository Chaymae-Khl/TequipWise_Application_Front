import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { User } from '../../../Models/user';
import { MessageDialogComponent } from '../../../message-dialog/message-dialog.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';

@Component({
  selector: 'app-users-manag',
  templateUrl: './users-manag.component.html',
  styleUrl: './users-manag.component.css',
})
export class UsersManagComponent implements OnInit{
  users:any;
  selectedUser: any;
  userId:any;
  showModal = false;
  searchTerm: string = '';


  locations: any;
  selectedLocation: any; // Store only the location of the selected plant
  plantsOfSelectedLocation: any[] = [];
  departmentsOfSelectedPlant: any[] = [];
  Roles: any;
  locationed: User = new User();
  mylocation: any;
  newPassword: any;
  confirmPassword: any;
  isPasswordVisible: boolean = false;
  mode: 'add' | 'view' | 'update' | 'changepassword' = 'add';
  visible: boolean = false;
  loading: boolean = false;
  loading2: boolean = true; // Initialize as true to show loading initially

  onApproverActiveChange() {
    if (!this.locationed.approverActive) {
      this.locationed.managerName =  this.locationed.managerName;
    }
  }
  onApproverActiveChangeBackup() {
    if (!this.locationed.backupActive) {
      this.locationed.backupaprover_Name = this.locationed.backupaprover_Name;
    }
  }

  // modalMode!: 'view' | 'update'|'changepassword';
  numberofusers:any;
constructor(private Authservice:AuthServiceService,public dialog: MatDialog,private messageService: MessageService,private openDataService: OpenDataServiceService){
}

ngOnInit(): void {
this.getUsers();
this.getNumofUsers();
this.getLocations();
this.getRoles();
}


getUsers(){
  this.loading2 = true; // Set loading to true before fetching data

  this.Authservice.getUsers().subscribe(
    (data) => {
      this.loading2 = false; // Set loading to false after data is fetched

      this.users = data;
      console.log(this.users);
    },
    (error) => {
      this.loading2 = false; // Ensure loading is turned off even in case of error

      console.error('An error occurred while fetching Users:', error);
      console.log('Error response:', error.error); // Log the response object
    }
  );

 
}

getNumofUsers(){
  this.Authservice.getNumUsers().subscribe(
    (data)=>{
      this.numberofusers=data;
    },
    (error)=>{
      console.error('An error occurred while fetching nuber of Users:', error);
    }
  )
}


deleteUser(user: User): void {
  const dialogRef = this.dialog.open(MessageDialogComponent, {
    data: { userName: user.userName }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.Authservice.deleteUser(user.id).subscribe(
        () => {
          console.log(`User ${user.userName} deleted.`);
          this.getUsers();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User deleted successfully',life: 10000});
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User delete failed',life: 10000 });
        }
      );
    }
  });
}
 
getLocations() {
  this.openDataService.getPlantsWDept().subscribe(
    (data) => {
      this.locations = data;
      // If there is a preselected location, update the plants and departments.
      if(this.locationed && this.locationed.locationName) {
        this.onLocationChange({ value: this.locationed.locationName });
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
  const selectedLocation = this.locations.find((location:any) => location.locationName === selectedLocationName);

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
getRoles() {
  this.Authservice.getRoles().subscribe(
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


showDialog(mode: 'add' | 'view' | 'update'|'changepassword', user?: any): void {
  this.mode = mode;
  this.locationed = user ? { ...user } : {};
  this.visible = true;
}




updateUser(updatedUser: User): void {
  this.loading = true; 
      this.Authservice.updateUser(updatedUser, updatedUser.id).subscribe(
        () => {
          this.visible=false;
          this.loading = false;
          // this.closeModal();
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User updated successfully',life: 10000});
         this.getUsers();
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
changePassword(data: { userId: any, newPassword: any }): void {
  const { userId, newPassword } = data;

      if (userId && newPassword) {
        this.Authservice.updatePassword(userId, newPassword).subscribe(
          () => {
            this.visible=false;
            // this.closeModal(); // Close modal after successful password update
            this.messageService.add({severity:'success', summary: 'Success', detail: 'Password updated successfully',life: 10000});

            console.log(`Password updated successfully.`);
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password update failed',life: 10000 });
            console.error('Error updating the password:', error);
          }
        );
      } else {
        console.error('Invalid userId or newPassword provided.');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid userId or newPassword provided',life: 10000 });

    }
 
}


togglePasswordVisibility() {
  this.isPasswordVisible = !this.isPasswordVisible;
}
}


