import { Component } from '@angular/core';
import { EquipementServiceService } from '../../Services/equipement-service.service';
import { EquipementRequestServiceService } from '../../Services/equipement-request-service.service';
import { data } from 'jquery';
import { error } from 'console';
import { SelectItem } from 'primeng/api';


@Component({
  selector: 'app-user-equipment-request-list',
  templateUrl: './user-equipment-request-list.component.html',
  styleUrl: './user-equipment-request-list.component.css'
})
export class UserEquipmentRequestListComponent {
  first = 0;
  rows = 10;
  EquipmentsList: any;
  NumberOfRequest: any = { count: 0 };
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Approved', value: true },
    { label: 'Not Approved', value: false }
  ];
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredEquipmentsList: any; // Variable to hold filtered list
  visible: boolean = false;
  selectedRequest: any;
  
  timelineEvents: any[] = [];

  requeststatus:any;
  constructor(private equipementService: EquipementRequestServiceService) {

   }

  ngOnInit() {
    this.getReuestList();
    this.getNumOfRequest();
  }
  

  showDialog(equip:any) {
    this.selectedRequest = [equip];
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
      this.filteredEquipmentsList = this.EquipmentsList;
    } else {
      // Filter based on selected approval status
      this.filteredEquipmentsList = this.EquipmentsList.filter((equip: any) =>
        equip.pR_Status === this.selectedFilter
      );
    }
  }

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange(event: { first: number; rows: number; }) {
    this.first = event.first;
    this.rows = event.rows;
  }

  isLastPage(): boolean {
    return true;
  }

  isFirstPage(): boolean {
    return true;
  }

  getReuestList() {
    this.equipementService.GetAuthRequestList().subscribe(
      (data) => {
        this.EquipmentsList = data;
        this.filteredEquipmentsList = data; // Initialize filtered list with original list
        console.log(this.filteredEquipmentsList);
      },
      (error) => {
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
