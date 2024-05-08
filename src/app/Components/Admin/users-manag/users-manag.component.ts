import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { User } from '../../../Models/user';
import { MessageDialogComponent } from '../../../message-dialog/message-dialog.component';
@Component({
  selector: 'app-users-manag',
  templateUrl: './users-manag.component.html',
  styleUrl: './users-manag.component.css'
})
export class UsersManagComponent implements OnInit{
  users:any;
  selectedUser: any;
  userId:any;
  showModal = false;
  searchTerm: string = '';
  modalMode!: 'view' | 'update'|'changepassword';

  
constructor(private Authservice:AuthServiceService,public dialog: MatDialog){
}

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
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  });
}

 // Function to show modal for viewing user details
 viewUserDetails(user: User): void {
  this.selectedUser = user;
  this.modalMode = 'view';
  this.showModal = true;
}

// Function to show modal for updating user details
openUpdateModal(user: User): void {
  this.selectedUser = user;
  this.modalMode = 'update';
  this.showModal = true;
}

// Function to show modal for updating the user password
openChangePasswordModal(userId: any): void {
  console.log('Opening Change Password Modal for User:', userId);
  this.userId = userId; // Set the userId property
  this.modalMode = 'changepassword';
  this.showModal = true;
}


// Function to close the modal
closeModal(): void {
  this.showModal = false;
  this.selectedUser = null;
  this.modalMode = "view";
}
// Function to update user details
updateUser(updatedUser: User): void {
  const dialogRef = this.dialog.open(MessageDialogComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.Authservice.updateUser(updatedUser, updatedUser.id).subscribe(
        () => {
          this.closeModal();
          console.log(`User updated successfully.`);
        },
        (error) => {
          console.error('Error deleting user:', error);
        }
      );
    }
  });
  
}


// Function to handle password change
changePassword(data: { userId: any, newPassword: any }): void {
  const { userId, newPassword } = data;
  const dialogRef = this.dialog.open(MessageDialogComponent, {
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      if (userId && newPassword) {
        this.Authservice.updatePassword(userId, newPassword).subscribe(
          () => {
            this.closeModal(); // Close modal after successful password update
            console.log(`Password updated successfully.`);
          },
          (error) => {
           
            console.error('Error updating the password:', error);
          }
        );
      } else {
        console.error('Invalid userId or newPassword provided.');
        // Handle error (e.g., show error message)
      }
    }
  });


}
}


