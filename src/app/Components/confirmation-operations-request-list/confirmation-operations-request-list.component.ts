import { Component } from '@angular/core';
import { EquipementRequestServiceService } from '../../Services/equipement-request-service.service';
import { SelectItem } from 'primeng/api';
import { LocalStorageServiceService } from '../../Services/local-storage-service.service';
import { EquipmentRequest } from '../../Models/equipment-request';

@Component({
  selector: 'app-confirmation-operations-request-list',
  templateUrl: './confirmation-operations-request-list.component.html',
  styleUrl: './confirmation-operations-request-list.component.css'
})
export class ConfirmationOperationsRequestListComponent {
  first = 0;
  rows = 10;
  RequestsList: any;
  searchTerm: string = '';
  NumberOfRequest: any = { count: 0 };
  date1: any;
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'You Approved', value: true },
    { label: ' You Rejected', value: false }
  ];
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredRequestList: any; // Variable to hold filtered list
  selectedRequest: EquipmentRequest = new EquipmentRequest();
  requestToUpdate: EquipmentRequest = new EquipmentRequest();
  visible: boolean = false;
  requeststatus: any;
  requestrejected: any;
  timelineEvents: any[] = [];
  IsManger!: boolean;
  IsItApprover!: boolean;
  mode: 'approve' | 'view' = 'approve';
  stateOptions: any[] = [
    { label: 'Approve', value: true },
    { label: 'Reject', value: false }
    // Use null or another value for the "Return" option
  ];
  // selectedOption: boolean | null = null; // Initialize as null or based on your default logic

  constructor(private equipementService: EquipementRequestServiceService, private localStorageService: LocalStorageServiceService) { }

  ngOnInit() {
    this.getReuestList();
    this.checkRoles();
  }

  updateRequest(requesttoUpdate: EquipmentRequest) {
    console.log(requesttoUpdate);

    this.equipementService.updateRequest(requesttoUpdate).subscribe(response => {
      // handle the response
      this.getReuestList();
      this.visible = false;

    },
      (error) => {
        console.log(error);

      }
    );
  }

  filterRequestsByDate() {
    console.log('Date selected:', this.date1);
    if (this.date1) {
      this.filteredRequestList = this.RequestsList.filter((equip: EquipmentRequest) =>
        this.isSameDate(new Date(equip.requestDate), this.date1)
      );
    } else {
      this.filteredRequestList = this.RequestsList;
    }
    console.log('Filtered list:', this.filteredRequestList);
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }

  filterRequests() {
    // Filter the list based on selected filter
    if (this.selectedFilter === null) {
      // Show all requests
      this.filteredRequestList = this.RequestsList;
    } else {
      // Filter based on selected approval status
      this.filteredRequestList = this.RequestsList.filter((equip: any) =>
        equip.departmangconfirmStatus === this.selectedFilter
      );
    }
  }
  showDialog(equip: any, mode: 'approve' | 'view') {

    this.selectedRequest = equip;
    this.mode = mode;
    this.visible = true;
    this.timelineEvents = [
      { title: 'Request Created', date: equip.requestDate, by: equip.nameOfUser, ForWho: equip.isNewhire, Equipment: equip.equipmentName, Comments: equip.comment },
      { title: 'Manager approval', date: equip.departmangconfirmedAt, by: equip.deptMangApproverName, RejectionCause: equip.departmang_Not_confirmCause, status: equip.departmangconfirmStatus },
      { title: 'IT approval', date: equip.iTconfirmedAt, by: equip.itApproverName, RejectionCause: equip.iT_Not_confirmCause, status: equip.iTconfirmSatuts, supplierOffer: equip.supplierOffer },
      { title: 'Finance approval', date: equip.financeconfirmedAt, by: equip.controllerApproverName, RejectionCause: equip.finance_Not_confirmCause, status: equip.financeconfirmSatuts },
      { title: 'PR & PO approval', statusPr: equip.pR_Status, Ponum: equip.poNum, PrNum: equip.prNum, RejectionCause: equip.pR_Not_ConfirmCause },
      { title: 'Request approval', date: equip.iTconfirmedAt, statusreq: equip.requestStatus }
    ];
    const requestApprovalEvent = this.timelineEvents.find(event => event.hasOwnProperty('statusreq'));
    const requestDeptApprovalEvent = this.timelineEvents.find(event => event.hasOwnProperty('status'));

    if (requestApprovalEvent || requestDeptApprovalEvent) {
      this.requeststatus = requestApprovalEvent.statusreq;
      this.requestrejected=requestDeptApprovalEvent.status;
      console.log('Extracted statusreq:', this.requeststatus);
      console.log('Extracted rrrr:', this.requestrejected);
      // You can now use statusreq as needed in your component
    }
  }
  getStatusText(event:any): string {
    if (event.status === true) {
        return 'Approved';
    } else if (event.status === false) {
        return 'Not Approved';
    } else if (event.supplierOffer !== null) {
        return 'Offer';
    } else if (event.financeconfirmSatuts === null) {
        return 'Waiting for Finance Approval';
    } else if (event.poNum === null) {
        return 'Waiting for PR';
    } else {
        return 'Open';
    }
}

getStatusPRText(event:any): string {
    if (event.statusPr === true) {
        return 'Approved';
    } else if (event.statusPr === false) {
        return 'Rejected';
    } else {
        return 'Open';
    }
}
  next() {
    this.first += this.rows;
  }

  prev() {
    this.first -= this.rows;
    if (this.first < 0) {
      this.first = 0;
    }
  }


  reset() {
    this.first = 0;
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return this.RequestsList ? this.first >= (this.RequestsList.length - this.rows) : true;
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  getReuestList() {
    this.equipementService.getRequestOfDepartement().subscribe(
      (data) => {
        this.RequestsList = data;
        this.filteredRequestList = data; // Initialize filtered list with original list
        console.log(this.RequestsList); // Check if data is correctly fetched
      },
      (error) => {
        console.error('Error fetching requests:', error);
      }
    );
  }
  clearDate() {
    this.date1 = null;
    this.filterRequestsByDate();
  }
  getNumOfRequest() {
    this.equipementService.NumberOfRequest().subscribe(
      (number) => {
        this.NumberOfRequest = number;
      }
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


    } else {
      //console.error('No token found');
    }
  }



}
