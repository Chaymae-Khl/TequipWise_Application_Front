import { Component } from '@angular/core';
import { MaintenanceServiceService } from '../../../Services/maintenance-service.service';
import { MaintenanceRequest } from '../../../Models/maintenance-request';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { LocalStorageServiceService } from '../../../Services/local-storage-service.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-maintenance-list',
  templateUrl: './user-maintenance-list.component.html',
  styleUrl: './user-maintenance-list.component.css'
})
export class UserMaintenanceListComponent {
maintenanceList:any;
loading:boolean=true;
loading2:boolean=false;
timelineEvents: any[] = [];
visible: boolean = false;
visible2: boolean = false;
visible3: boolean = false;
apiUrl = environment.globalUrl;
IsApprover!: boolean;
  IsManger!: boolean;
  IsController!: boolean;
  IsItApprover!: boolean;
  ISitbackupAprover!: boolean;
  IScONTROLLERbackupAprover!: boolean;
  IsAdmin!: boolean;
  ISbackupAprover!:boolean;
selectedRequest:MaintenanceRequest=new MaintenanceRequest();
stateOptions: any[] = [
  { label: 'Approve', value: true },
  { label: 'Reject', value: false }
];
constructor(private maintenanceRequest:MaintenanceServiceService, private sanitizer: DomSanitizer,private localStorageService: LocalStorageServiceService,private messageService: MessageService ){
}
ngOnInit(){
this.GetRequestForApprovers();
this.checkRoles();
}
GetRequestForApprovers(){
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
        case 'Finance approval':
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
      case 'Finance approval':
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

getITrStatus(): string {
  if (this.selectedRequest.iTconfirmSatuts === true) {
    return 'Approved';
  } else if (this.selectedRequest.iTconfirmSatuts === false) {
    return 'Rejected';
  }else if (this.selectedRequest.controllerconfirmSatuts === false || this.selectedRequest.departmangconfirmStatus === false) {
    return 'Closed';
  } 
  else {
    return 'Open';
  }
}
getControllerStatus(): string {
  if (this.selectedRequest.controllerconfirmSatuts === true) {
    return 'Approved';
  } else if (this.selectedRequest.controllerconfirmSatuts === false) {
    return 'Rejected';
  }
  else if (this.selectedRequest.departmangconfirmStatus === false ) {
    return 'Closed';
  } 
  else {
    return 'Open';
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
    this.localStorageService.IsControllerBackupApprover(token).subscribe(
      (isBackup: boolean) => {
        this.IScONTROLLERbackupAprover = isBackup;
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
    this.localStorageService.IsController(token).subscribe(
      (iscontroller: boolean) => {
        this.IsController = iscontroller;
        console.log('Manager status:', iscontroller);
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

  showDialog(req:any){ 
     this.visible = true;
      this.selectedRequest=req;
      this.timelineEvents = [
        { title: 'Request Created',ForWho: req.requestUserName,by:req.itApproverName,damageTYpe:req.damageTYpe, Equipment: req.assetType,Comments:req.description,equipementType:req.equipmentType,sn:req.sn,supplier:req.supplierName,offer:req.offer},
        { title: 'Manager approval', date: req.departmangconfirmedAt, by: req.departementManagerName, RejectionCause: req.departmang_Not_confirmCause, statusManag: this.getmanagerStatus(),statusManag2:req.departmangconfirmStatus },
        { title: 'Finance approval', date: req.controllerconfirmedAt, by: req.controllerName, RejectionCause: req.controller_Not_confirmCause, statusFina:this.getControllerStatus(), cc: req.cc, gl: req.gl, order: req.order },
        { title: 'IT approval', date: req.iTconfirmedAt, by: req.itApproverName, RejectionCause: req.pR_Not_ConfirmCause, statusIT: this.getITrStatus(),statusIT2:req.iTconfirmSatuts,imi:req.imi,modele:req.modele,telnum:req.telNumber },
        { title: 'Asset approval', date: req.iTconfirmedAt, statusreq: this.getRequestStatusGeneral(req),statusreq2:req.requestStatus,AssignementStatus:req.receptionStatus,AssignedAt:req.assetReceiveByEMployeAt }
      ];
  }

  showDialog2(){
    this.visible2 = true;
  }
  loadPdf(filePath?: string): SafeResourceUrl {
    const fileUrl = `${this.apiUrl}/${filePath}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
  }
  showDialog3(req:any){
    this.visible3 = true;
    this.selectedRequest=req;
  }
  Approve(){
    console.log(this.selectedRequest)
    this.loading2 = true;
    this.maintenanceRequest.Aproval( this.selectedRequest.maintenanceId, this.selectedRequest).subscribe(
      (response) => {
        this.GetRequestForApprovers();
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


}
