import { Component } from '@angular/core';
import { EquipementRequestServiceService } from '../../Services/equipement-request-service.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { LocalStorageServiceService } from '../../Services/local-storage-service.service';
import { EquipmentRequest } from '../../Models/equipment-request';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-confirmation-operations-request-list',
  templateUrl: './confirmation-operations-request-list.component.html',
  styleUrl: './confirmation-operations-request-list.component.css'
})
export class ConfirmationOperationsRequestListComponent {
  // first = 0;
  // rows = 10;
  // RequestsList: any;
  // searchTerm: string = '';
  // NumberOfRequest: any = { count: 0 };
  // date1: any;
  // filterOptions: SelectItem[] = [
  //   { label: 'All', value: null },
  //   { label: 'Open', value: 'Open' },
  //   { label: 'You Approved', value: true },
  //   { label: 'You Rejected', value: false }
  // ];
  // apiUrl = environment.globalUrl;
  // selectedFilter: any = null;
  // filteredRequestList: any;
  // selectedRequest: EquipmentRequest = new EquipmentRequest();
  // requestToUpdate: EquipmentRequest = new EquipmentRequest();
  // visible: boolean = false;
  // requeststatus: any;
  // requestrejected: any;
  // timelineEvents: any[] = [];
  // IsManger!: boolean;
  // IsItApprover!: boolean;
  // mode: 'approve' | 'view' | 'Offer' = 'Offer';
  // loading: boolean = false;
  // showDragAndDropArea: boolean = true; // Flag to show/hide drag and drop area

  // stateOptions: any[] = [
  //   { label: 'Approve', value: true },
  //   { label: 'Reject', value: false }
  // ];
  // loading2: boolean = true;
  // uploadedFile: any;
  // uploadedFileName: string | null = null;
  // pdfSrc: SafeResourceUrl | undefined|null; ; // Store the URL for the PDF

  // constructor(
  //   public dialog: MatDialog,
  //   private equipementService: EquipementRequestServiceService,
  //   private localStorageService: LocalStorageServiceService,
  //   private messageService: MessageService,
  //   private sanitizer: DomSanitizer
  // ) {}

  // ngOnInit() {
  //   this.getReuestList();
  //   this.checkRoles();
  // }

//   updateRequest(requestToUpdate: EquipmentRequest) {
//     this.loading = true;
//     this.equipementService.updateRequest(requestToUpdate).subscribe(
//       (response) => {
//         this.getReuestList();
//         this.visible = false;
//         this.loading = false;
//         this.messageService.add({
//           severity: 'success',
//           summary: 'Success Message',
//           detail: requestToUpdate.departmangconfirmStatus ? 'The request has been approved' : 'The request has been rejected',
//           key: 'br',
//           life: 10000
//         });
//       },
//       (error) => {
//         console.log(error);
//         this.loading = false;
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Error Message',
//           detail: 'We faced a problem while saving status',
//           key: 'br',
//           life: 10000
//         });
//       }
//     );
//   }

//   filterRequestsByDate() {
//     console.log('Date selected:', this.date1);
//     if (this.date1) {
//       this.filteredRequestList = this.RequestsList.filter((equip: EquipmentRequest) =>
//         this.isSameDate(new Date(equip.requestDate), this.date1)
//       );
//     } else {
//       this.filteredRequestList = this.RequestsList;
//     }
//     console.log('Filtered list:', this.filteredRequestList);
//   }

//   private isSameDate(date1: Date, date2: Date): boolean {
//     return (
//       date1.getFullYear() === date2.getFullYear() &&
//       date1.getMonth() === date2.getMonth() &&
//       date1.getDate() === date2.getDate()
//     );
//   }

//   filterRequests() {
//     if (this.selectedFilter === null) {
//       this.filteredRequestList = this.RequestsList;
//     } else if (this.selectedFilter === 'Open') {
//       this.filteredRequestList = this.RequestsList.filter((equip: any) =>
//         equip.departmangconfirmStatus === null &&
//         equip.iTconfirmSatuts === null &&
//         equip.financeconfirmSatuts === null &&
//         equip.pR_Status === null
//       );
//     } else if (this.selectedFilter === true) {
//       this.filteredRequestList = this.RequestsList.filter((equip: any) =>
//         equip.departmangconfirmStatus === true ||
//         equip.iTconfirmSatuts === true ||
//         equip.financeconfirmSatuts === true ||
//         equip.pR_Status === true
//       );
//     } else if (this.selectedFilter === false) {
//       this.filteredRequestList = this.RequestsList.filter((equip: any) =>
//         equip.departmangconfirmStatus === false 
       
//       );
//     }
//   }

//   showDialog(equip: any, mode: 'approve' | 'view' | 'Offer') {
//     this.selectedRequest = equip;
//     this.mode = mode;
//     this.visible = true;
//     this.timelineEvents = [
//       { title: 'Request Created', date: equip.requestDate, by: equip.nameOfUser, ForWho: equip.isNewhire, Equipment: equip.equipmentName, Comments: equip.comment },
//       { title: 'Manager approval', date: equip.departmangconfirmedAt, by: equip.deptMangApproverName, RejectionCause: equip.departmang_Not_confirmCause, status: equip.departmangconfirmStatus },
//       {  title: 'IT approval', date: equip.iTconfirmedAt, by: equip.itApproverName, RejectionCause: equip.iT_Not_confirmCause, status: equip.iTconfirmSatuts, supplierOffer: equip.supplierOffer, supplierOfferurl: this.loadPdf(equip.supplierOffer) },
//       { title: 'Finance approval', date: equip.financeconfirmedAt, by: equip.controllerApproverName, RejectionCause: equip.finance_Not_confirmCause, status: equip.financeconfirmSatuts },
//       { title: 'PR & PO approval', statusPr: equip.pR_Status, Ponum: equip.poNum, PrNum: equip.prNum, RejectionCause: equip.pR_Not_ConfirmCause },
//       { title: 'Request approval', date: equip.iTconfirmedAt, statusreq: equip.requestStatus }
//     ];
//     const requestApprovalEvent = this.timelineEvents.find(event => event.hasOwnProperty('statusreq'));
//     const requestDeptApprovalEvent = this.timelineEvents.find(event => event.hasOwnProperty('status'));

//     if (requestApprovalEvent || requestDeptApprovalEvent) {
//       this.requeststatus = requestApprovalEvent.statusreq;
//       this.requestrejected = requestDeptApprovalEvent.status;
//       console.log('Extracted statusreq:', this.requeststatus);
//       console.log('Extracted rrrr:', this.requestrejected);
//     }
//   }

//   getStatusText(event: any): string {
//     if (event.status === true) return 'Approved';
//     if (event.status === false) return 'Rejected';
//     if (event.status === null) return 'Open';
//     if (event.status === 'Closed') return 'Closed';
//     if (event.supplierOffer != null) return 'Offer';
//     return 'In Progress';
// }

// getStatusPRText(event: any): string {
//     if (event.statusPr === true) return 'Approved';
//     if (event.statusPr === false) return 'Rejected';
//     if (event.statusPr === null) return 'Open';
//     if (event.statusPr === 'Closed') return 'Closed';
//     return 'In Progress';
// }
//   next() {
//     this.first += this.rows;
//   }

//   prev() {
//     this.first -= this.rows;
//     if (this.first < 0) {
//       this.first = 0;
//     }
//   }

//   reset() {
//     this.first = 0;
//   }

//   pageChange(event: { first: number; rows: number; }) {
//     this.first = event.first;
//     this.rows = event.rows;
//   }

//   isLastPage(): boolean {
//     return this.RequestsList ? this.first >= (this.RequestsList.length - this.rows) : true;
//   }

//   isFirstPage(): boolean {
//     return this.first === 0;
//   }

//   getReuestList() {
//     this.loading2 = true;
//     this.equipementService.getRequestOfDepartement().subscribe(
//       (data) => {
//         this.RequestsList = data;
//         this.filteredRequestList = data;
//         console.log(this.RequestsList);
//         this.loading2 = false;
//       },
//       (error) => {
//         console.error('Error fetching requests:', error);
//         this.loading2 = true;
//       }
//     );
//   }

//   clearDate() {
//     this.date1 = null;
//     this.filterRequestsByDate();
//   }

//   getNumOfRequest() {
//     this.equipementService.NumberOfRequest().subscribe(
//       (number) => {
//         this.NumberOfRequest = number;
//       }
//     );
//   }

//   async checkRoles() {
//     const token = await this.localStorageService.getItem("token");

//     if (token) {
//       this.localStorageService.IsManger(token).subscribe(
//         (isManager: boolean) => {
//           this.IsManger = isManager;
//           console.log('Manager status:', isManager);
//         },
//         (error: any) => {
//           console.error('Error fetching manager status:', error);
//         }
//       );

//       this.localStorageService.IsItApprover(token).subscribe(
//         (isItApprover: boolean) => {
//           this.IsItApprover = isItApprover;
//           console.log('Manager status:', isItApprover);
//         },
//         (error: any) => {
//           console.error('Error fetching manager status:', error);
//         }
//       );
//     }
//   }

// //file upload
// onFileInputChange(event: any): void {
//   const file = event?.target?.files?.[0];
//   if (file) {
//     this.uploadedFile = file;
//     this.uploadedFileName = file.name;
//     this.loadPdfContent(file); // Load PDF content when file is selected
//   }
// }

// onFileUpload(event: any) {
//   this.uploadedFile = event.files[0];
//   this.showDragAndDropArea = false;
//   this.loadPdfContent(this.uploadedFile); // Load PDF content when file is uploaded
// }

// onRemoveFile() {
//   this.uploadedFile = null;
//   this.pdfSrc = null; // Clear the displayed PDF content when file is removed
//   this.showDragAndDropArea = true; // Show the drag and drop area again
// }

// // Method to confirm and upload supplier offer
// confirmUpload(): void {
//   if (this.uploadedFile) {
//     // const requestId = this.selectedRequest.userEquipmentRequestId; // Replace with actual request ID

//     this.equipementService.uploadSupplierOffer(requestId, this.uploadedFile).subscribe(
//       (response) => {
//         this.uploadedFileName = this.uploadedFile?.name || null;
//         this.visible = false;
//         this.getReuestList();
//         this.messageService.add({
//           severity: 'success',
//           summary: 'File Uploaded',
//           detail: 'Supplier offer uploaded successfully',
//           life: 3000
//         });
//         // Additional logic after successful upload if needed
//       },
//       (error) => {
//         console.error('Error uploading file', error);
//         this.messageService.add({
//           severity: 'error',
//           summary: 'Upload Error',
//           detail: 'Failed to upload supplier offer',
//           life: 3000
//         });
//       }
//     );
//   }
// }
// loadPdfContent(file: File): void {
//   const reader = new FileReader();
//   reader.onload = () => {
//     const blob = new Blob([reader.result as ArrayBuffer], { type: 'application/pdf' });
//     const url = window.URL.createObjectURL(blob);
//     this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL
//   };
//   reader.readAsArrayBuffer(file);
// }

// loadPdf(filePath: string): SafeResourceUrl {
//   const fileUrl = `${this.apiUrl}/${filePath}`;
//   return this.sanitizer.bypassSecurityTrustResourceUrl(fileUrl);
// }
}
