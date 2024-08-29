import { Component } from '@angular/core';
import { MaintenanceRequest } from '../../Models/maintenance-request';
import { MaintenanceServiceService } from '../../Services/maintenance-service.service';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenance-request',
  templateUrl: './maintenance-request.component.html',
  styleUrl: './maintenance-request.component.css'
})
export class MaintenanceRequestComponent {
  users:any;
  choices: any;
  loading:boolean=false;
  newMaintenance:MaintenanceRequest=new MaintenanceRequest();
  uploadedFile: any;
  suppliers:any;
constructor(private maintenanceService:MaintenanceServiceService, private router: Router)
{

}
  ngOnInit() {
    this.choices = [
      { name: 'User damage'},
      { name: 'Warenty'},
  ];
   this.getUsers();
   this.getSuppliers();
   }

   AddNewRequest(){
    this.loading=true;
    console.log(this.newMaintenance)
    console.log(this.uploadedFile)
    this.maintenanceService.PassRequest(this.newMaintenance,this.uploadedFile).subscribe(
      (response) => {
    this.loading=false;
    this.router.navigate(['/maintenanceRequestlist']);
       console.log('Request saved')
      },
      (error) => {
    this.loading=false;

        console.log('error saving the request:',error)
      }
    );
}
getUsers(){

  this.maintenanceService.getUsers().subscribe(
    (data) => {

      this.users = data;
      
    }
  );

 
}

getSuppliers(){

  this.maintenanceService.getALlSupliers().subscribe(
    (data) => {
      this.suppliers = data;
      console.log(this.suppliers)
    }
  );

 
}
   onFileUpload(event: any) {
    const file = event.files[0];
    if (file.size > 1000000 || file.type !== 'application/pdf') {
      alert('File must be a PDF and less than 1MB');
      return;
    }
    this.uploadedFile = file;
  }

}
