import { Component } from '@angular/core';
import { EquipementServiceService } from '../../Services/equipement-service.service';
import { EquipementRequestServiceService } from '../../Services/equipement-request-service.service';
import { data } from 'jquery';
import { error } from 'console';
import { SelectItem } from 'primeng/api';
import { EquipmentRequest } from '../../Models/equipment-request';


@Component({
  selector: 'app-user-equipment-request-list',
  templateUrl: './user-equipment-request-list.component.html',
  styleUrl: './user-equipment-request-list.component.css'
})
export class UserEquipmentRequestListComponent {
  first = 0;
  rows = 10;
  RequestsList: any;  
  NumberOfRequest: any = { count: 0 };
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Approved', value: true },
    { label: 'Not Approved', value: false }
  ];
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredRequestList: any; // Variable to hold filtered list
  visible: boolean = false;
  selectedRequest: EquipmentRequest = new EquipmentRequest();
  loading2: boolean = true; // Initialize as true to show loading initially
  timelineEvents: any[] = [];
  requeststatus:any;
  constructor(private equipementService: EquipementRequestServiceService) {

   }

  ngOnInit() {
    this.getReuestList();
    this.getNumOfRequest();
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
  showDialog(equip:any) {
    this.selectedRequest = equip;
      this.visible = true;
      this.timelineEvents = [
        { title: 'Request Created', date: equip.requestDate, by: equip.nameOfUser , ForWho: equip.isNewhire, Equipment: equip.equipmentName,Comments:equip.comment },
        { title: 'Manager approval', date: equip.departmangconfirmedAt, by: equip.deptMangApproverName, RejectionCause: equip.departmang_Not_confirmCause, status: equip.departmangconfirmStatus },
        { title: 'IT approval', date: equip.iTconfirmedAt, by: equip.itApproverName, RejectionCause: equip.iT_Not_confirmCause, status: equip.iTconfirmSatuts, supplierOffer: equip.supplierOffer },
        { title: 'Finance approval', date: equip.financeconfirmedAt, by: equip.controllerApproverName, RejectionCause: equip.finance_Not_confirmCause, status: equip.financeconfirmSatuts },
        { title: 'PR & PO approval', statusPr: equip.pR_Status, Ponum: equip.poNum, PrNum: equip.prNum, RejectionCause: equip.pR_Not_ConfirmCause },
        { title: 'Request approval', date: equip.iTconfirmedAt, statusreq: equip.requestStatus }
      ];
      const requestApprovalEvent = this.timelineEvents.find(event => event.hasOwnProperty('statusreq'));
  if (requestApprovalEvent) {
    this.requeststatus = requestApprovalEvent.statusreq;
    console.log('Extracted statusreq:', this.requeststatus);
    // You can now use statusreq as needed in your component
  }
  }
   getStatusLabel(status: boolean, supplierOffer: any): string {
    if (supplierOffer && !status) {
      return 'Offer';
    }
    return status ? 'Approved' : 'Open';
  }

  getPRStatusLabel(status: boolean, rejectionCause: any): string {
    if (rejectionCause != null) {
      return 'Not Confirmed';
    }
    return status ? 'Approved' : 'Open';
  }
  filterRequests() {
    // Filter the list based on selected filter
    if (this.selectedFilter === null) {
      // Show all requests
      this.filteredRequestList = this.RequestsList;
    } else {
      // Filter based on selected approval status
      this.filteredRequestList = this.RequestsList.filter((equip: any) =>
        equip.requestStatus === this.selectedFilter
      );
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
    this.loading2 = true; // Set loading to true before fetching data
    this.equipementService.GetAuthRequestList().subscribe(
      (data) => {
        this.RequestsList = data;
        this.loading2 = false; // Set loading to false after data is fetched
        this.filteredRequestList = data; // Initialize filtered list with original list
        console.log(this.filteredRequestList);
      },
      (error) => {
        this.loading2 = true; // Ensure loading is turned off even in case of error
      }
    );
  }

  getNumOfRequest() {
    this.equipementService.NumberOfRequest().subscribe(
      (number) => {
        this.NumberOfRequest = number;
      }
    );
  }
}
