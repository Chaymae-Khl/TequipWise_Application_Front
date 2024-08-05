import { Component } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';
import { EquipmentRequest } from '../../../Models/equipment-request';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../../../Services/local-storage-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubRequest } from '../../../Models/sub-request';
import { environment } from '../../../../environments/environment';
import { EquipementServiceService } from '../../../Services/equipement-service.service';
import { AuthServiceService } from '../../../Services/auth-service.service';
class ManagerApproval {
  Status?: boolean
  NotConfirmCause?: string;
}
@Component({
  selector: 'app-confirmation-equipment-list',
  templateUrl: './confirmation-equipment-list.component.html',
  styleUrl: './confirmation-equipment-list.component.css'
})
export class ConfirmationEquipmentListComponent {
  expandedRows = {};
  equipmentRequests: any;
  supliersNames: any;
  selectedRequest: EquipmentRequest = new EquipmentRequest();
  Mainrequest: EquipmentRequest = new EquipmentRequest();
  selectedSubRequest: SubRequest = new SubRequest();
  ManagerAproveFields: ManagerApproval = new ManagerApproval();
  loading: boolean = true;
  loading2: boolean = false;
  loading3: boolean = false;
  loading4: boolean = false;
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredRequestList: any; // Variable to hold filtered list
  searchTerm: string = '';
  date1: any;
  uploadedFile: any;
  uploadedFileName: string | null = null;
  showDragAndDropArea: boolean = true; // Flag to show/hide drag and drop area
  apiUrl = environment.globalUrl;
  pdfSrc: SafeResourceUrl | undefined | null;; // Store the URL for the PDF
  pdfVisible: boolean = false;
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Approved', value: 'Approved' },
    { label: 'Open', value: 'Open' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Partly Approved', value: 'Partly Approved' },
    { label: 'Rejected', value: 'Rejected' }
  ];
  approvedEquipmentSubRequests: any[] = [];
  visible: boolean = false;
  visible2: boolean = false;
  timelineEvents: any[] = [];
  mode: 'request' | 'subrequest' |  'approve' | 'approveContoller' | 'PR&PO' = 'approve';
  mode2: 'approve' | 'approveContoller' | 'PR&PO' | 'PO' | 'Assign' |'Offer'|'AdminApprove' = 'approve';
  ManagerList:any;
  ItApproversList:any;
  ControllerList:any;
  IsManger!: boolean;
  IsController!: boolean;
  IsItApprover!: boolean;
  IsAdmin!: boolean;
  Mysubrequest: any;
  stateOptions: any[] = [
    { label: 'Approve', value: true },
    { label: 'Reject', value: false }
  ];
  constructor(private equipementService: EquipementRequestServiceService, private router: Router, private localStorageService: LocalStorageServiceService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer, private equipementmanService: EquipementServiceService,
    private authservice: AuthServiceService
  ) {

  }
  ngOnInit() {
    this.getReuestList();
    this.checkRoles();
    this.getSuppliersName();
    this.filterApprovedEquipment();
    if (this.selectedRequest && this.selectedRequest.supplierOffer) {
      this.pdfSrc = this.loadPdf(this.selectedRequest.supplierOffer);
    }
    this.getControllers();
    this.getITApprovers();
    this.getMangers();
  }
  //helpers method
  //its a helper function  to get the selected request of the subrequest

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
  filterApprovedEquipment() {
    if (this.selectedRequest && this.selectedRequest.equipmentSubRequests) {
      this.approvedEquipmentSubRequests = this.selectedRequest.equipmentSubRequests.filter(
        (request: any) => request.deptmangstatus === true
      );
    }
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
    }
  }


  isAllSubRequestsRejected(request: any): boolean {
    return request.equipmentSubRequests.every((subRequest: any) => subRequest.financeconfirmSatuts === false);
  }

  get approvedSubRequests() {
    return this.selectedRequest.equipmentSubRequests.filter(subRequest => subRequest.departmangconfirmStatus === true);
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
  showDialog(mode: 'request' | 'subrequest' , req: any) {
    this.mode = mode;

    if (mode === 'request') {
      this.selectedRequest = req;
      this.selectedSubRequest = {};

    }
    else if (mode === 'subrequest') {
      this.selectedSubRequest = req;
      const selectedSubEquipmentRequestId: any = this.selectedSubRequest.subEquipmentRequestId;
      this.Mysubrequest = this.findSelectedRequest(selectedSubEquipmentRequestId);
      console.log(this.selectedSubRequest);
    }

    this.visible = true;
    this.timelineEvents = [
      { title: 'Request Created', ForWho: req.forWho, Equipment: req.equipementName, Comments: req.comment, Quantity: req.qtEquipment, PU: req.pu },
      { title: 'Manager approval', date: req.departmangconfirmedAt, by: req.departementManagerName, RejectionCause: req.departmang_Not_confirmCause, statusManag: req.departmangconfirmStatus },
      { title: 'IT approval', date: req.iTconfirmedAt, by: req.itApproverName, RejectionCause: req.pR_Not_ConfirmCause, statusIT: req.iTconfirmSatuts, supplierOffer: this.Mysubrequest?.supplierOffer, PrStatus: this.getPRStatus(req.pR_Status, req), prnum: req.prNum, ponum: req.poNum },
      { title: 'Finance approval', date: req.financeconfirmedAt, by: req.controllerName, RejectionCause: req.finance_Not_confirmCause, statusFina: req.financeconfirmSatuts, cc: req.cc, gl: req.gl, order: req.order },
      {
        title: 'Asset approval', date: req.iTconfirmedAt, statusreq: req.subRequestStatus, statusPr: req.pR_Status, Ponum: req.poNum, AssignedAt: req.assetReceiveByEMployeAt, AssignementStatus: req.receptionStatus
      }
    ];
  }

  showDialog2(mode2: 'approve' | 'approveContoller' | 'PR&PO' | 'PO' | 'Assign'| 'Offer'|'AdminApprove', req: any) {
    this.mode2 = mode2;
    this.visible2 = true;
    this.selectedSubRequest = req;
    const selectedSubEquipmentRequestId: any = this.selectedSubRequest.subEquipmentRequestId;
    this.Mainrequest = this.findSelectedRequest(selectedSubEquipmentRequestId);
    if (mode2 === 'Assign' ||mode2==='AdminApprove') {
      if (!this.selectedSubRequest.assetReceiveByEMployeAt) {
          // Set to today's date if not set (first time)
          this.selectedSubRequest.assetReceiveByEMployeAt = null;
      } else {
          // Ensure the date is a Date object (for subsequent updates)
          this.selectedSubRequest.assetReceiveByEMployeAt = new Date(this.selectedSubRequest.assetReceiveByEMployeAt);
      }
  }
  else if (mode2 === 'Offer') {
    this.selectedRequest = req;
    this.selectedSubRequest = {};
    if (this.mode2 === 'Offer' && this.selectedRequest.supplierOffer) {
      this.uploadedFile = new File([this.selectedRequest.supplierOffer], this.selectedRequest.supplierOffer, {
        type: 'application/pdf',
      });
      this.pdfSrc = this.loadPdf(this.selectedRequest.supplierOffer);
    }
  }
 
  }
  
  togglePdfVisibility(): void {
    this.pdfVisible = !this.pdfVisible;
  }

  //Status of the approvers
  getmanagerStatus(): string {
    if (this.selectedSubRequest.departmangconfirmStatus === true) {
      return 'Approved';
    } else if (this.selectedSubRequest.departmangconfirmStatus === false) {
      return 'Rejected';
    }
    else {
      return 'Open';
    }
  }
  getItStatus(): string {
    if (this.selectedSubRequest.iTconfirmSatuts === true) {
      return 'Approved';
    } else if (this.selectedSubRequest.iTconfirmSatuts === false) {
      return 'Rejected';
    } else if (this.selectedSubRequest.departmangconfirmStatus === false) {
      return 'Closed';
    } else if (this.Mysubrequest.supplierOffer != null) {
      return 'Offer';
    } else {
      return 'Open';
    }
  }

  getFinanceStatus(): string {
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
  getSubRequestStatusGeneral(): string {
    if (this.selectedSubRequest.departmangconfirmStatus === false || this.selectedSubRequest.iTconfirmSatuts === false || this.selectedSubRequest.financeconfirmSatuts === false ||this.selectedSubRequest.pR_Status === false) {
      return 'Rejected';
    } else if (this.selectedSubRequest.departmangconfirmStatus === true && this.selectedSubRequest.iTconfirmSatuts === null && this.Mysubrequest.supplierOffer === null) {
      return 'In Progress';
    } else if (this.selectedSubRequest.departmangconfirmStatus === true && this.Mysubrequest.supplierOffer != null && this.selectedSubRequest.financeconfirmSatuts === null) {
      return 'Waiting for Finance Approval';
    } else if (this.selectedSubRequest.financeconfirmSatuts === true && this.selectedSubRequest.pR_Status === null) {
      return 'Waiting for PR';
    } else if (this.selectedSubRequest.pR_Status === true && this.selectedSubRequest.poNum === null) {
      return 'Waiting for PO';
    } else if (this.selectedSubRequest.pR_Status === true && this.selectedSubRequest.subRequestStatus === true) {
      return 'Approved';
    } else if (this.Mysubrequest.supplierOffer != null && this.selectedSubRequest.iTconfirmSatuts === null) {
      return 'Offer';
    } else {
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
  getPRStatus(prStatus: any | null, request: any): string {
    if (prStatus === true) return 'Approved';
    if (prStatus === false) return 'Rejected';
    if (prStatus === null && request?.requestStatus === false) return 'closed';
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
    } else if (anyApproved && anyRejected) {
      return 'Partly Approved';
    } else if (allApproved) {
      return 'Approved';
    } else if (allRejected) {
      return 'Rejected';
    } else if (anyPendingApproval) {
      return 'Pending';
    }

    return 'Partly Rejected';
  }
  filterRequests() {
    if (this.selectedFilter === null) {
      // Show all requests
      this.filteredRequestList = this.equipmentRequests;
    } else {
      this.filteredRequestList = this.equipmentRequests.filter((equip: any) =>
        this.getRequestStatus(equip) === this.selectedFilter
      );
    }
  }

  //It's for the the dept manager and the finanace approval status Approve/reject
  ManagerApprve() {
    console.log(this.selectedSubRequest)
    this.loading2 = true;
    this.equipementService.Aproval(this.Mainrequest.equipmentRequestId, this.selectedSubRequest.subEquipmentRequestId, this.selectedSubRequest).subscribe(
      (response) => {
        this.getReuestList();
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
  AdminApprove() {
    console.log(this.selectedSubRequest)
    this.loading2 = true;
    this.equipementService.AdminAproval(this.Mainrequest.equipmentRequestId, this.selectedSubRequest.subEquipmentRequestId, this.selectedSubRequest).subscribe(
      (response) => {
        this.getReuestList();
        this.visible2 = false;
        this.loading2 = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: 'Your response saved successfully',
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

  //for the the infos Entred by the finace and the it(CC,Gl,Order)

  //file upload
  onFileInputChange(event: any): void {
    const file = event?.target?.files?.[0];
    console.log(file)
    if (file) {
      if (file.size > 1000000 || file.type !== 'application/pdf') {
        alert('File must be a PDF and less than 1MB');
        return;
      }
      this.uploadedFile = file;
      this.uploadedFileName = file.name;
      this.loadPdfContent(file); // Load PDF content when file is selected
    }
  }

  onFileUpload(event: any) {
    const file = event.files[0];
    if (file.size > 1000000 || file.type !== 'application/pdf') {
      alert('File must be a PDF and less than 1MB');
      return;
    }
    this.uploadedFile = file;
    this.showDragAndDropArea = false;
    this.loadPdfContent(this.uploadedFile); // Load PDF content when file is uploaded
  }

  onRemoveFile() {
    this.uploadedFile = null;
    this.pdfSrc = null; // Clear the displayed PDF content when file is removed
    this.showDragAndDropArea = true; // Show the drag and drop area again
  }
  // Method to confirm and upload supplier offer
  confirmUploadAndITData() {
    this.loading3 = true;
  if (this.uploadedFile || this.selectedRequest.supplierOffer) {
    const requestId = this.selectedRequest.equipmentRequestId; // Replace with actual request ID
    this.equipementService.uploadSupplierOffer(requestId, this.selectedRequest, this.uploadedFile).subscribe(
      (response) => {
        this.uploadedFileName = this.uploadedFile?.name || null;
        this.loading3 = false;
        this.getReuestList();
        this.visible2 = false;
        this.messageService.add({
          severity: 'success',
          summary: 'File Uploaded',
          detail: 'Supplier offer uploaded successfully',
          life: 3000
        });
        // Additional logic after successful upload if needed
      },
      (error) => {
        this.loading3 = false;
        console.error('Error uploading file', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Upload Error',
          detail: 'Failed to upload supplier offer',
          life: 3000
        });
      }
    );
  } else {
    this.loading3 = false;
    this.messageService.add({
      severity: 'error',
      summary: 'Upload Error',
      detail: 'No file selected for upload',
      life: 3000
    });
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
  getSuppliersName() {
    this.equipementmanService.getsupplierName().subscribe
      (data => {
        this.supliersNames = data;

      },
        (error) => {
          console.log(error);
        }

      );
  }
  getControllers(): void {
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.ControllerList = data
          .filter((user: any) => user.roles && user.roles.includes('Controller'))
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
}
