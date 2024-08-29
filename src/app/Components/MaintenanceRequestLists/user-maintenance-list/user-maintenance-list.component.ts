import { Component } from '@angular/core';
import { MaintenanceServiceService } from '../../../Services/maintenance-service.service';
import { MaintenanceRequest } from '../../../Models/maintenance-request';

@Component({
  selector: 'app-user-maintenance-list',
  templateUrl: './user-maintenance-list.component.html',
  styleUrl: './user-maintenance-list.component.css'
})
export class UserMaintenanceListComponent {
maintenanceList:any;
loading:boolean=true;
selectedRequest:MaintenanceRequest=new MaintenanceRequest();
constructor(private maintenanceRequest:MaintenanceServiceService){

}
ngOnInit(){
this.GetPhoneRequestForApprovers();
}
GetPhoneRequestForApprovers(){
  this.maintenanceRequest.getRequests().subscribe(
    (data) => {
      this.maintenanceList = data;
      this.loading = false; // Set loading to false after data is fetched
      // this.filteredRequestList = data;
      // this.filteredRequestList = data; // Initialize filtered list with original list
      console.log(this.maintenanceList);
    },
    (error) => {
      this.loading = true; // Ensure loading is turned off even in case of error
    }
  );
  }

  isRecentRequest(requestDate: string): boolean {
    const now = new Date();
    const requestDateTime = new Date(requestDate);
    const timeDifference = now.getTime() - requestDateTime.getTime();
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);

    return timeDifferenceInMinutes < 7; // Checks if the request was made in the last 10 minutes
  }
  getRequestStatusGeneral(request:MaintenanceRequest): string {
    if (request.departmangconfirmStatus === false || request.iTconfirmSatuts === false || request.controllerconfirmSatuts === false ||request.pR_Status === false) {
      return 'Rejected';
    } else if (request.departmangconfirmStatus === true && request.iTconfirmSatuts === null ) {
      return 'In Progress';
    } else if (request.departmangconfirmStatus === true  && request.controllerconfirmSatuts === null) {
      return 'Waiting for Finance Approval';
    } else if (request.controllerconfirmSatuts === true && request.pR_Status === null) {
      return 'Waiting for PR';
    } else if (request.pR_Status === true && request.poNum === null) {
      return 'Waiting for PO';
    } else if (request.pR_Status === true && request.requestStatus === true) {
      return 'Approved';
    } else {
      return 'Open';
    }
  }
  showDialog(request:MaintenanceRequest){}
}
