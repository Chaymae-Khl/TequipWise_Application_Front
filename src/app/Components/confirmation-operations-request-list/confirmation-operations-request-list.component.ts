import { Component } from '@angular/core';
import { EquipementRequestServiceService } from '../../Services/equipement-request-service.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-confirmation-operations-request-list',
  templateUrl: './confirmation-operations-request-list.component.html',
  styleUrl: './confirmation-operations-request-list.component.css'
})
export class ConfirmationOperationsRequestListComponent {
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
  selectedRequest: any;
  visible: boolean = false;
  requeststatus:any;
  timelineEvents: any[] = [];
  constructor(private equipementService: EquipementRequestServiceService) { }

  ngOnInit() {
    this.getReuestList();
  }

  filterRequests() {
    // Filter the list based on selected filter
    if (this.selectedFilter === null) {
      // Show all requests
      this.filteredEquipmentsList = this.EquipmentsList;
    } else {
      // Filter based on selected approval status
      this.filteredEquipmentsList = this.EquipmentsList.filter((equip: any) =>
        equip.departmangconfirmStatus === this.selectedFilter
      );
    }
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
    this.equipementService.getRequestOfDepartement().subscribe(
      (data) => {
        this.EquipmentsList = data;
        this.filteredEquipmentsList = data; // Initialize filtered list with original list
        console.log(this.EquipmentsList);
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
