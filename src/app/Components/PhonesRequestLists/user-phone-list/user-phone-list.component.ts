import { Component } from '@angular/core';
import { PhoneRequestServiceService } from '../../../Services/phone-request-service.service';
import { data } from 'jquery';

@Component({
  selector: 'app-user-phone-list',
  templateUrl: './user-phone-list.component.html',
  styleUrl: './user-phone-list.component.css'
})
export class UserPhoneListComponent {
userPhoneList:any
loading: boolean = true;
visible: boolean = false;
timelineEvents: any[] = [];
selectedRequest:any;
constructor(private phonerequestservice:PhoneRequestServiceService){}
ngOnInit() {
this.GetPhoneRequestForUser();
}

GetPhoneRequestForUser(){
  this.phonerequestservice.GetPhoneRequestForAuthUser().subscribe(
    (data) => {
      this.userPhoneList = data;
      this.loading = false; // Set loading to false after data is fetched
      // this.filteredRequestList = data;
      // this.filteredRequestList = data; // Initialize filtered list with original list
      console.log(this.userPhoneList);
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

  getRequestStatusGeneral(status: any): string {
  
  
    if (status.requestStatus === false) {
      return 'Rejected';
    } else if (status.departmangconfirmStatus === true && status.hRconfirmSatuts === null && status.iTconfirmSatuts === null) {
      return 'Waiting for HR';
    } else if (status.departmangconfirmStatus === true && status.hRconfirmSatuts === true && status.iTconfirmSatuts === null) {
      return 'Waiting for IT';
    } else if (status.requestStatus === true) {
      return 'Approved';
    } else if (status.departmangconfirmStatus === null && status.hRconfirmSatuts === null && status.iTconfirmSatuts === null) {
      return 'Open';
    } else {
      return 'In Progress';
    }
  }


  showDialog(req:any) {
    this.visible = true;
    this.selectedRequest=req;
    this.timelineEvents = [
      { title: 'Request Created',ForWho: req.forWho,by:req.nmaeOfUser,NameofNewEmpl:req.newHireName, Equipment: req.assetType,Comments:req.comment,PhonerequestType:req.phoneRequestType,replacementType:req.replacemnetType},
      { title: 'Manager approval', date: req.departmangconfirmedAt, by: req.departementManagerName, RejectionCause: req.departmang_Not_confirmCause, statusManag: this.getmanagerStatus(),statusManag2:req.departmangconfirmStatus },
      { title: 'HR approval', date: req.hRconfirmedAt, by: req.hrApproverName, RejectionCause: req.hR_Not_confirmCause, statusHr: this.getHRrStatus(),statusHr2:req.hRconfirmSatuts },
      { title: 'IT approval', date: req.iTconfirmedAt, by: req.itApproverName, RejectionCause: req.pR_Not_ConfirmCause, statusIT: this.getITrStatus(),statusIT2:req.iTconfirmSatuts },
      { title: 'Asset approval', date: req.iTconfirmedAt, statusreq: this.getRequestStatusGeneral(req),statusreq2:req.requestStatus }
    ];
  
  }
  getmanagerStatus(): string {
    if (this.selectedRequest.departmangconfirmStatus === true) {
      return 'Approved';
    } else if (this.selectedRequest.departmangconfirmStatus === false) {
      return 'Rejected';
    }
  
    else {
      return 'Open';
    }
  }
  getHRrStatus(): string {
    if (this.selectedRequest.hRconfirmSatuts === true) {
      return 'Approved';
    } else if (this.selectedRequest.hRconfirmSatuts === false) {
      return 'Rejected';
    }
    else if (this.selectedRequest.departmangconfirmStatus === false ) {
      return 'Closed';
    } 
    else {
      return 'Open';
    }
  }
  getITrStatus(): string {
    if (this.selectedRequest.iTconfirmSatuts === true) {
      return 'Approved';
    } else if (this.selectedRequest.iTconfirmSatuts === false) {
      return 'Rejected';
    }else if (this.selectedRequest.hRconfirmSatuts === false || this.selectedRequest.departmangconfirmStatus === false) {
      return 'Closed';
    } 
    else {
      return 'Open';
    }
  }
  getIconForEvent(event: any): string {
    switch(event.title) {
        case 'Manager approval':
            return event.statusManag2 === true ? 'pi pi-check-circle' :
                   event.statusManag2 === false ? 'pi pi-times-circle' :
                   event.statusHr2 === false || event.statusManag2 === false ? 'pi pi-ban' : 'pi pi-hourglass';
        case 'IT approval':
            return event.statusIT2 === true ? 'pi pi-check-circle' :
                   event.statusIT2 === false ? 'pi pi-times-circle' :
                   event.statusHr2 === false || event.statusManag2 === false ? 'pi pi-ban' : 'pi pi-hourglass';
        case 'HR approval':
            return event.statusHr2 === true ? 'pi pi-check-circle' :
                   event.statusHr2 === false ? 'pi pi-times-circle' :
                   event.statusManag2 === false ? 'pi pi-ban' : 'pi pi-hourglass';
        case 'Asset approval':
            return event.statusreq2 === true ? 'pi pi-check-circle' :
                   event.statusreq2 === false ? 'pi pi-times-circle' :
                   'pi pi-hourglass';
        default:
            return 'pi pi-circle-on';
    }
}
getColorForEvent(event: any): string {
  switch(event.title) {
      case 'Manager approval':
          return event.statusManag2 === true ? 'green' :
                 event.statusManag2 === false ? 'red' :
                 event.statusHr2 === false || event.statusManag2 === false ? 'red' : 'rgba(0, 51, 255, 0.777)';
      case 'IT approval':
          return event.statusIT2 === true ? 'green' :
                 event.statusIT2 === false ? 'red' :
                 event.statusHr2 === false || event.statusManag2 === false ? 'red' : 'rgba(0, 51, 255, 0.777)';
      case 'HR approval':
          return event.statusHr2 === true ? 'green' :
                 event.statusHr2 === false ? 'red' :
                 event.statusManag2 === false ? 'red' : 'rgba(0, 51, 255, 0.777)';
      case 'Asset approval':
          return event.statusreq2 === true ? 'green' :
                 event.statusreq2 === false ? 'red' : 'rgb(0, 47, 255)';
      default:
          return '#232c5d';
  }
}


}


