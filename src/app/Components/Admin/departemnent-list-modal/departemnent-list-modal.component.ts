import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Plant } from '../../../Models/plant';
import { LocationServiceService } from '../../../Services/location-service.service';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-departemnent-list-modal',
  templateUrl: './departemnent-list-modal.component.html',
  styleUrl: './departemnent-list-modal.component.css'
})
export class DepartemnentListModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private authservice: AuthServiceService, public dialogRef: MatDialogRef<DepartemnentListModalComponent>, public locationService: LocationServiceService,private messageService: MessageService) { }
  plant:Plant=new Plant();
  users: any;
  ngOnInit(){
    this.getUsersNames();
  }
  get getdata() {
    return this.data.data;
  }

  get isDepartment() {
    return this.data.type === 'department';
  }

  get isPlant() {
    return this.data.type === 'plant';
  }
  // Close dialog method
  closeModal(): void {
    this.dialogRef.close();
  }

  
//getusersNames
  getUsersNames(): void {
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.users = data.map((user: any) => ({
          ...user,
          fullName: `${user.teNum} (${user.userName})`
        }));
      },
      (error) => {
        console.error('An error occurred while fetching Users:', error);
        console.log('Error response:', error.error); // Log the response object
      }
    );
  }

AddPlantToLocation(){
  this.locationService.addPlantToLocation(this.data.locationid,this.plant).subscribe(
    (response) => {
      this.closeModal();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Plant Added to location successfully', life: 10000 });

      console.log('plant added successfully:', response);
      
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Plant Added failed', life: 10000 });

      console.error('Error adding supplier:', error);
    }
  );
}


}
