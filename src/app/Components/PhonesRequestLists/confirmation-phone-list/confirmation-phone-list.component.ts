import { Component } from '@angular/core';
import { PhoneRequestServiceService } from '../../../Services/phone-request-service.service';
import { LocalStorageServiceService } from '../../../Services/local-storage-service.service';
import { PhoneRequest } from '../../../Models/phone-request';
import { MessageService } from 'primeng/api';
import { AuthServiceService } from '../../../Services/auth-service.service';

@Component({
  selector: 'app-confirmation-phone-list',
  templateUrl: './confirmation-phone-list.component.html',
  styleUrl: './confirmation-phone-list.component.css'
})
export class ConfirmationPhoneListComponent {
  userPhoneList:any
  loading: boolean = true;
  visible: boolean = false;
  visible2: boolean = false;
  visible3: boolean = false;
  categories: any;
  timelineEvents: any[] = [];
  selectedRequest:PhoneRequest= new PhoneRequest();
  IsManger!: boolean;
  IsHr!: boolean;
  IsItApprover!: boolean;
  ISitbackupAprover!: boolean;
  ISbackupAprover!: boolean;
  IsApprover!: boolean;
  IsAdmin!: boolean;
  loading2: boolean = false;
  stateOptions: any[] = [
    { label: 'Approve', value: true },
    { label: 'Reject', value: false }
  ];
  ItApproversList:any;
  ManagerList:any;
  HRList:any;
  constructor(private phonerequestservice:PhoneRequestServiceService, private localStorageService: LocalStorageServiceService, private messageService: MessageService, private authservice: AuthServiceService){}
  ngOnInit() {
  this.GetPhoneRequestForApprovers();
  this.checkRoles();
  this.categories = [
    { name: 'A' },
    { name: 'B' },
    { name: 'C' },
    { name: 'D' }
];
this.getITApprovers();
this.getMangers();
this.getHRs();
  }
  
  GetPhoneRequestForApprovers(){
    this.phonerequestservice.getRequestOfApprovers().subscribe(
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
        { title: 'HR approval', date: req.hRconfirmedAt, by: req.hrApproverName, RejectionCause: req.hR_Not_confirmCause, statusHr: this.getHRrStatus(),statusHr2:req.hRconfirmSatuts,emplCatego:req.employeeCategorie },
        { title: 'IT approval', date: req.iTconfirmedAt, by: req.itApproverName, RejectionCause: req.pR_Not_ConfirmCause, statusIT: this.getITrStatus(),statusIT2:req.iTconfirmSatuts,imi:req.imi,modele:req.modele,telnum:req.telNumber },
        { title: 'Asset approval', date: req.iTconfirmedAt, statusreq: this.getRequestStatusGeneral(req),statusreq2:req.requestStatus,AssignementStatus:req.receptionStatus,AssignedAt:req.assetReceiveByEMployeAt }
      ];
    
    }
    showDialog2(req:any) {
      this.visible2 = true;
      this.selectedRequest=req;
      if (!this.selectedRequest.assetReceiveByEMployeAt) {
        // Set to today's date if not set (first time)
        this.selectedRequest.assetReceiveByEMployeAt = null;
    } else {
        // Ensure the date is a Date object (for subsequent updates)
        this.selectedRequest.assetReceiveByEMployeAt = new Date(this.selectedRequest.assetReceiveByEMployeAt);
    }
     
    }
    showDialog3(req:any) {
      this.visible3 = true;
      this.selectedRequest=req;
      if (!this.selectedRequest.assetReceiveByEMployeAt) {
        // Set to today's date if not set (first time)
        this.selectedRequest.assetReceiveByEMployeAt = null;
    } else {
        // Ensure the date is a Date object (for subsequent updates)
        this.selectedRequest.assetReceiveByEMployeAt = new Date(this.selectedRequest.assetReceiveByEMployeAt);
    }
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
  async checkRoles() {
    const token = await this.localStorageService.getItem("token");

    if (token) {
      this.localStorageService.IsManger(token).subscribe(
        (isManager: boolean) => {
          this.IsManger = isManager;
          console.log('Manager status:', isManager);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );
      this.localStorageService.IsHR(token).subscribe(
        (ishr: boolean) => {
          this.IsHr = ishr;
          console.log('Manager status:', ishr);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );
      this.localStorageService.IsManagerBackupApprover(token).subscribe(
        (isBackup: boolean) => {
          this.ISbackupAprover = isBackup;
          console.log('Manager status:', isBackup);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );
      this.localStorageService.IsITBackupApprover(token).subscribe(
        (isBackup: boolean) => {
          this.ISitbackupAprover = isBackup;
          console.log('Manager status:', isBackup);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );

      this.localStorageService.IsItApprover(token).subscribe(
        (isItApprover: boolean) => {
          this.IsItApprover = isItApprover;
          console.log('Manager status:', isItApprover);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );
     
      this.localStorageService.IsAdmin(token).subscribe(
        (isAdmin: boolean) => {
          this.IsAdmin = isAdmin;
          console.log('Admin status:', isAdmin);
        },
        (error: any) => {
          console.error('Error fetching admin status:', error);
        }
      );
      this.localStorageService.IsApprover(token).subscribe(
        (isApprover: boolean) => {
          this.IsApprover = isApprover;
          console.log('Admin status:', isApprover);
        },
        (error: any) => {
          console.error('Error fetching admin status:', error);
        }
      );
    }
  }
  Approve(){
    this.loading2 = true;
    this.phonerequestservice.Aproval(this.selectedRequest.phoneRequestId,this.selectedRequest).subscribe(
      (response) => {
        this.GetPhoneRequestForApprovers();
        this.visible2 = false;
        this.loading2 = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Your response saved succeffuly',
          life: 10000
        });
      },
      (error) => {
        console.log(error);
        this.loading2 = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'We faced a problem while saving status',
          life: 10000
        });
      }
    );
  }
  ApproveAdmin(){
    this.loading2 = true;
    this.phonerequestservice.Aproval(this.selectedRequest.phoneRequestId,this.selectedRequest).subscribe(
      (response) => {
        this.GetPhoneRequestForApprovers();
        this.visible2 = false;
        this.loading2 = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Your response saved succeffuly',
          life: 10000
        });
      },
      (error) => {
        console.log(error);
        this.loading2 = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Error Message',
          detail: 'We faced a problem while saving status',
          life: 10000
        });
      }
    );
  }
  getITApprovers(): void {
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.ItApproversList = data
          .filter((user: any) => user.roles && user.roles.includes('It Approver'))
          .map((user: any) => ({
            ...user,
            fullName: `${user.teNum} (${user.userName})`
          }));
      },
      (error) => {
        // console.error('An error occurred while fetching Users:', error);
      }
    );
  }
  getMangers(): void {
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.ManagerList = data
          .filter((user: any) => user.roles && user.roles.includes('Manager'))
          .map((user: any) => ({
            ...user,
            fullName: `${user.teNum} (${user.userName})`
          }));
      },
      (error) => {
        // console.error('An error occurred while fetching Users:', error);
      }
    );
  }
  getHRs(){
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.HRList = data
          .filter((user: any) => user.roles && user.roles.includes('HR Approver'))
          .map((user: any) => ({
            ...user,
            fullName: `${user.teNum} (${user.userName})`
          }));
      },
      (error) => {
        // console.error('An error occurred while fetching Users:', error);
      }
    );
  }
}
