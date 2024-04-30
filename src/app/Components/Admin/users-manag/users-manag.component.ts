import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { User } from '../../../Models/user';
@Component({
  selector: 'app-users-manag',
  templateUrl: './users-manag.component.html',
  styleUrl: './users-manag.component.css'
})
export class UsersManagComponent implements OnInit{
  users:any;
  showUserDetails= false;
  selectedUser: any;
  showUpdateDialog = false;
  usertoupdate: User  = new User();
  isModalOpen = false; // Modal state
constructor(private Authservice:AuthServiceService,public dialog: MatDialog){}

ngOnInit(): void {
this.getUsers();
}

getUsers(){
  this.Authservice.getUsers().subscribe(
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


deleteUser(user: any) {
  if (confirm(`Are you sure you want to delete ${user.userName}?`)) {
    this.Authservice.deleteUser(user.id).subscribe(
      () => {
        // User deleted successfully, perform any necessary actions (e.g., refresh user list)
        console.log(`User ${user.userName} deleted.`);
        this.getUsers();
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}



 // Function to show user details
 viewUserDetails(user: any) {
  this.selectedUser = user;
  this.showUserDetails = true;
}

// Function to close user details modal
closeUserDetails() {
  this.showUserDetails = false;
  this.selectedUser = null;
}



openUpdateModal(user: User): void {
  this.isModalOpen = true;
  // Create a copy of the selected user object to update
  this.usertoupdate = { ...user };
}

closeUpdateModal(): void {
  this.isModalOpen = false;
  this.usertoupdate = new User(); // Reset userToUpdate
}

updateUser(user:User): void {
  
    this.Authservice.updateUser(user.id,user).subscribe(
      () => {
        // User deleted successfully, perform any necessary actions (e.g., refresh user list)
        console.log(`User updated.`);
        this.getUsers();
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  this.closeUpdateModal();
}
}
