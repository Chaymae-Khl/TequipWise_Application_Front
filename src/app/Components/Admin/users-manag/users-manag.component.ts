import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { User } from '../../../Models/user';
import { MessageDialogComponent } from '../../../message-dialog/message-dialog.component';
import { MessageService } from 'primeng/api';
import { data } from 'jquery';
import { error } from 'console';
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
  modalMode!: 'view' | 'update'|'changepassword';
  numberofusers:any;
constructor(private Authservice:AuthServiceService,public dialog: MatDialog,private messageService: MessageService){
}

ngOnInit(): void {
this.getUsers();
this.getNumofUsers();
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
          this.messageService.add({severity:'success', summary: 'Success', detail: 'User updated successfully',life: 10000});
          console.log(`User updated successfully.`);
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User update failed',life: 10000 });
          console.error('Error updating user:', error);
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

        // Handle error (e.g., show error message)
      }
    }
  });


}
}


