import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';
import { EquipmentRequest } from '../../../Models/equipment-request';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../../../Services/local-storage-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubRequest } from '../../../Models/sub-request';
import { environment } from '../../../../environments/environment';
class ManagerApproval {
  Status?:boolean
   NotConfirmCause?:string;
  }
@Component({
  selector: 'app-confirmation-equipment-list',
  templateUrl: './confirmation-equipment-list.component.html',
  styleUrl: './confirmation-equipment-list.component.css'
})
export class ConfirmationEquipmentListComponent {
  expandedRows = {};
  equipmentRequests: any;
  selectedRequest: EquipmentRequest = new EquipmentRequest();
  Mainrequest:EquipmentRequest = new EquipmentRequest();
  selectedSubRequest:SubRequest = new SubRequest();
  ManagerAproveFields:ManagerApproval=new ManagerApproval();
  loading: boolean = true;
  loading2:boolean=false;
  loading3:boolean=false;
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredRequestList: any; // Variable to hold filtered list
  searchTerm: string = '';
  date1: any;
  uploadedFile: any;
  uploadedFileName: string | null = null;
  showDragAndDropArea: boolean = true; // Flag to show/hide drag and drop area
  apiUrl = environment.globalUrl;
  pdfSrc: SafeResourceUrl | undefined|null; ; // Store the URL for the PDF
  pdfVisible: boolean = false;
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Open', value: 'Open' },
    { label: 'You Approved', value: true },
    { label: 'You Rejected', value: false }
  ];
  visible: boolean = false;
  timelineEvents: any[] = [];
  mode: 'request' | 'subrequest'|'Offer'|'approve' = 'approve';
  IsManger!: boolean;
   IsItApprover!: boolean;
  Mysubrequest:any;
  stateOptions: any[] = [
    { label: 'Approve', value: true },
    { label: 'Reject', value: false }
  ];
  constructor(private equipementService: EquipementRequestServiceService, private router: Router,  private localStorageService: LocalStorageServiceService,
      private messageService: MessageService,
      private sanitizer: DomSanitizer) {

  }
  //its a hlper function  to get the selected request of the subrequest
 
  filterRequestsByDate() {
    console.log('Date selected:', this.date1);
    if (this.date1) {
      this.filteredRequestList = this.equipmentRequests.filter((equip: any) =>
        this.isSameDate(new Date(equip.requestDate), this.date1)
      );
    } else {
      this.filteredRequestList = this.equipmentRequests;
    }
    console.log('Filtered list:', this.filteredRequestList);
  }
  clearDate() {
    this.date1 = null;
    this.filterRequestsByDate();
  }
  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
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
    
          this.localStorageService.IsItApprover(token).subscribe(
            (isItApprover: boolean) => {
              this.IsItApprover = isItApprover;
              console.log('Manager status:', isItApprover);
            },
            (error: any) => {
              console.error('Error fetching manager status:', error);
            }
          );
        }
      }
  // filterRequests() {
  //   if (this.selectedFilter === null) {
  //     this.filteredRequestList = this.equipmentRequests;
  //   } else if (this.selectedFilter === 'Open') {
  //     this.filteredRequestList = this.equipmentRequests.filter((equip: any) =>
  //       equip.departmangconfirmStatus === null &&
  //       equip.iTconfirmSatuts === null &&
  //       equip.financeconfirmSatuts === null &&
  //       equip.pR_Status === null
  //     );
  //   } else if (this.selectedFilter === true) {
  //     this.filteredRequestList = this.equipmentRequests.filter((equip: any) =>
  //       equip.departmangconfirmStatus === true ||
  //       equip.iTconfirmSatuts === true ||
  //       equip.financeconfirmSatuts === true ||
  //       equip.pR_Status === true
  //     );
  //   } else if (this.selectedFilter === false) {
  //     this.filteredRequestList = this.equipmentRequests.filter((equip: any) =>
  //       equip.departmangconfirmStatus === false 
  //     );
  //   }
  // }

 
  ngOnInit() {
    this.getReuestList();
    this.checkRoles();

  }
  //its a hlper function  to get the selected request of the subrequest
  findSelectedRequest = (subEquipmentRequestId: number) => {
    // Iterate over each equipment request
    for (const req of this.equipmentRequests) {
      // Check if subEquipmentRequestId exists in any of the equipmentSubRequests
      const subReq = req.equipmentSubRequests.find((subReq: any) => subReq.subEquipmentRequestId === subEquipmentRequestId);
      if (subReq) {
        return req; // Return the equipmentRequest containing the matching subEquipmentRequest
      }
    }
    return null; // Return null if not found
  };
  showDialog(mode: 'request' | 'subrequest' |'approve'|'Offer',req:any) {
    this.mode = mode;
   
  if (mode === 'request') {
    this.selectedRequest = req;
    this.selectedSubRequest={};

  }
   else if (mode === 'subrequest') {
    this.selectedSubRequest = req;
    const selectedSubEquipmentRequestId:any = this.selectedSubRequest.subEquipmentRequestId; 
    this.Mysubrequest = this.findSelectedRequest(selectedSubEquipmentRequestId);
   // console.log( this.Mysubrequest );
  } 
  
  else if (mode === 'approve') {
    this.selectedSubRequest = req;
    const selectedSubEquipmentRequestId:any = this.selectedSubRequest.subEquipmentRequestId;
    this.Mainrequest=this.findSelectedRequest(selectedSubEquipmentRequestId);
    console.log( this.Mainrequest );
    console.log( this.selectedSubRequest );
  }

  else if(mode=== 'Offer'){
    this.selectedRequest = req;
    this.selectedSubRequest={};
    console.log( this.selectedRequest );

  }

    this.visible = true;
    this.timelineEvents = [
      { title: 'Request Created',ForWho: req.isNewhire, Equipment: req.equipementName,Comments:req.comment,Quantity:req.qtEquipment,PU:req.pu },
      { title: 'Manager approval', date: req.departmangconfirmedAt, by: req.departementManagerName, RejectionCause: req.departmang_Not_confirmCause, statusManag: req.departmangconfirmStatus },
      { title: 'IT approval', date: req.iTconfirmedAt, by: req.itApproverName, RejectionCause: req.iT_Not_confirmCause, statusIT: req.iTconfirmSatuts, supplierOffer:  this.Mysubrequest?.supplierOffer },
      { title: 'Finance approval', date: req.financeconfirmedAt, by: req.controllerName, RejectionCause: req.finance_Not_confirmCause, statusFina: req.financeconfirmSatuts },
      { title: 'Asset approval', date: req.iTconfirmedAt, statusreq: req.subRequestStatus}
    ];
}
togglePdfVisibility(): void {
  this.pdfVisible = !this.pdfVisible;
}

//Status of the approvers
getmanagerStatus():string{
  if (this.selectedSubRequest.departmangconfirmStatus === true) {
    return 'Approved';
} else if (this.selectedSubRequest.departmangconfirmStatus === false) {
    return 'Rejected';
} 
 else {
    return 'Open';
}
}
getItStatus():string{
  if (this.selectedSubRequest.iTconfirmSatuts === true) {
    return 'Approved';
} else if (this.selectedSubRequest.iTconfirmSatuts === false) {
    return 'Rejected';
} else if (this.Mysubrequest.supplierOffer != null) {
  return 'Offer';
} else if (this.selectedSubRequest.departmangconfirmStatus === false || this.selectedSubRequest.iTconfirmSatuts === false) {
  return 'Closed';
} 
 else {
    return 'Open';
}
}

getFinanceStatus():string{
  if (this.selectedSubRequest.financeconfirmSatuts === true) {
    return 'Approved';
} else if (this.selectedSubRequest.financeconfirmSatuts === false) {
    return 'Rejected';

} else if (this.selectedSubRequest.departmangconfirmStatus === false || this.selectedSubRequest.iTconfirmSatuts === false) {
  return 'Closed';
} 
 else {
    return 'Open';
} 
}

//status of the subrequest
getSubRequestStatusGeneral():string{
  if (this.selectedSubRequest.departmangconfirmStatus === true && this.selectedSubRequest.iTconfirmSatuts === null && this.Mysubrequest.supplierOffer === null) {
    return 'In Progress';
} else if ( this.selectedSubRequest.departmangconfirmStatus === true && this.Mysubrequest.supplierOffer != null && this.selectedSubRequest.financeconfirmSatuts === null) {
    return 'Waiting for Finance Approval';

} else if (  this.Mysubrequest.pR_Status === true && this.selectedSubRequest.subRequestStatus===true) {
  return 'Approved';
}  else if (  this.selectedSubRequest.departmangconfirmStatus === false || this.selectedSubRequest.iTconfirmSatuts === false || this.selectedSubRequest.financeconfirmSatuts === false ) {
  return 'Rejected';
} else if (  this.Mysubrequest.supplierOffer != null &&  this.selectedSubRequest.iTconfirmSatuts === null ) {
  return 'Offer';
} 
 else {
    return 'Open';
} 
}
                                  
                                                               


  getReuestList() {
    this.loading = true; // Set loading to true before fetching data
    this.equipementService.getRequestOfDepartement().subscribe(
      (data) => {
        this.equipmentRequests = data;
        this.loading = false; // Set loading to false after data is fetched
        this.filteredRequestList = data;
        // this.filteredRequestList = data; // Initialize filtered list with original list
        console.log(this.equipmentRequests);
      },
      (error) => {
        this.loading = true; // Ensure loading is turned off even in case of error
      }
    );
  }
  getPRStatus(prStatus: any | null,request:any): string {
    if (prStatus === true) return 'Approved';
    if (prStatus === false) return 'Rejected';
    if (prStatus === null && request?.requestStatus===false) return 'closed';
    return 'open';
  }
  // Method to determine the overall status of the main request
  getRequestStatus(request: EquipmentRequest): string {
    if (!request || !request.equipmentSubRequests) {
        return 'Unknown';
    }

    const allSubRequests = request.equipmentSubRequests;

    const allApproved = allSubRequests.every(subRequest => subRequest.subRequestStatus === true);
    const anyApproved = allSubRequests.some(subRequest => subRequest.subRequestStatus === true);
    const anyRejected = allSubRequests.some(subRequest => subRequest.subRequestStatus === false);
    const allRejected = allSubRequests.every(subRequest => subRequest.subRequestStatus === false);
    
    const allStatusesNull = allSubRequests.every(subRequest =>
        subRequest.departmangconfirmStatus === null &&
        subRequest.iTconfirmSatuts === null &&
        subRequest.financeconfirmSatuts === null &&
        subRequest.subRequestStatus === null
    );

    const anyPendingApproval = allSubRequests.some(subRequest =>
        subRequest.departmangconfirmStatus === null ||
        subRequest.iTconfirmSatuts === null ||
        subRequest.financeconfirmSatuts === null ||
        subRequest.subRequestStatus === null
    );

    if (allStatusesNull) {
        return 'Open';
    } else if (anyApproved && anyRejected ) {
        return 'Partly Approved';
    } else if (allApproved) {
        return 'Approved';
    } else if (allRejected) {
        return 'Rejected';
    } else if (anyPendingApproval ) {
        return 'Pending';
    }

    return 'Partly Rejected';
}
filterRequests() {
  // Filter the list based on selected filter
  if (this.selectedFilter === null) {
      // Show all requests
      this.filteredRequestList = this.equipmentRequests;
  }
  else if (this.selectedFilter === 'Open') {
          this.filteredRequestList = this.equipmentRequests.filter((equip: any) =>
            equip.supplierOffer === null &&
            equip.pR_Status === null &&
            equip.requestStatus === null
          );
        }
  
  else {
      // Filter based on selected approval status
      this.filteredRequestList = this.equipmentRequests.filter((equip: any) =>
          equip.requestStatus === this.selectedFilter
      );
  }
}
  ManagerApprve() {
    console.log(this.selectedSubRequest)
    this.loading2 = true;
    this.equipementService.Aproval(this.Mainrequest.equipmentRequestId,this.selectedSubRequest.subEquipmentRequestId,this.selectedSubRequest).subscribe(
      (response) => {
        this.getReuestList();
        this.visible = false;
        this.loading2 = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: this.ManagerAproveFields.Status? 'The request has been approved' : 'The request has been rejected',
          key: 'br',
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
          key: 'br',
          life: 10000
        });
      }
    );
  }
//file upload
onFileInputChange(event: any): void {
  const file = event?.target?.files?.[0];
  if (file) {
    this.uploadedFile = file;
    this.uploadedFileName = file.name;
    this.loadPdfContent(file); // Load PDF content when file is selected
  }
}

onFileUpload(event: any) {
  this.uploadedFile = event.files[0];
  this.showDragAndDropArea = false;
  this.loadPdfContent(this.uploadedFile); // Load PDF content when file is uploaded
}

onRemoveFile() {
  this.uploadedFile = null;
  this.pdfSrc = null; // Clear the displayed PDF content when file is removed
  this.showDragAndDropArea = true; // Show the drag and drop area again
}

// Method to confirm and upload supplier offer
confirmUploadAndITData(){
  this.loading3 = true;
  if (this.uploadedFile) {
    const requestId = this.selectedRequest.equipmentRequestId; // Replace with actual request ID

    this.equipementService.uploadSupplierOffer(requestId,this.selectedRequest, this.uploadedFile).subscribe(
      (response) => {
        this.uploadedFileName = this.uploadedFile?.name || null;
        this.loading2 = false;
         this.getReuestList(); 
      this.visible = false;
        this.messageService.add({
          severity: 'success',
          summary: 'File Uploaded',
          detail: 'Supplier offer uploaded successfully',
          life: 3000
        });
        // Additional logic after successful upload if needed
      },
      (error) => {
        this.loading2 = false;
        console.error('Error uploading file', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Upload Error',
          detail: 'Failed to upload supplier offer',
          life: 3000
        });
      }
    );
  }
}
loadPdfContent(file: File): void {
  const reader = new FileReader();
  reader.onload = () => {
    const blob = new Blob([reader.result as ArrayBuffer], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL
  };
  reader.readAsArrayBuffer(file);
}

loadPdf(filePath: string): SafeResourceUrl {
  const fileUrl = `${this.apiUrl}/${filePath}`;
  return this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
}

}
