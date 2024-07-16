import { Component, Input } from '@angular/core';
import { TableRowCollapseEvent, TableRowExpandEvent } from 'primeng/table';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';
import { SelectItem } from 'primeng/api';
import { EquipmentRequest } from '../../../Models/equipment-request';
import { SubRequest } from '../../../Models/sub-request';
import { SharedService } from '../../../Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-equipment-list',
  templateUrl: './user-equipment-list.component.html',
  styleUrl: './user-equipment-list.component.css'
})
export class UserEquipmentListComponent {
  expandedRows = {};
  equipmentRequests: any;
  selectedRequest?:any;
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredRequestList: any; // Variable to hold filtered list
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Approved', value: true },
    { label: 'Not Approved', value: false }
  ];
  visible: boolean = false;
  timelineEvents: any[] = [];

  constructor(private equipementService: EquipementRequestServiceService,private sharedService: SharedService, private router: Router) {

  }
  ngOnInit() {
    this.getReuestList();
  }
  showDialog(req:any) {
    this.selectedRequest = req;
   console.log(this.selectedRequest);

    this.visible = true;
    // this.timelineEvents = [
    //   { title: 'Request Created', date: equip.requestDate, by: equip.nameOfUser , ForWho: equip.isNewhire, Equipment: equip.equipmentName,Comments:equip.comment,Quantity:equip.numberEquipment },
    //   { title: 'Manager approval', date: equip.departmangconfirmedAt, by: equip.deptMangApproverName, RejectionCause: equip.departmang_Not_confirmCause, status: equip.departmangconfirmStatus },
    //   { title: 'IT approval', date: equip.iTconfirmedAt, by: equip.itApproverName, RejectionCause: equip.iT_Not_confirmCause, status: equip.iTconfirmSatuts, supplierOffer: equip.supplierOffer },
    //   { title: 'Finance approval', date: equip.financeconfirmedAt, by: equip.controllerApproverName, RejectionCause: equip.finance_Not_confirmCause, status: equip.financeconfirmSatuts },
    //   { title: 'PR & PO approval', statusPr: equip.pR_Status, Ponum: equip.poNum, PrNum: equip.prNum, RejectionCause: equip.pR_Not_ConfirmCause },
    //   { title: 'Request approval', date: equip.iTconfirmedAt, statusreq: equip.requestStatus }
    // ];
//     const requestApprovalEvent = this.timelineEvents.find(event => event.hasOwnProperty('statusreq'));
// if (requestApprovalEvent) {
//   this.requeststatus = requestApprovalEvent.statusreq;
//   console.log('Extracted statusreq:', this.requeststatus);
//   // You can now use statusreq as needed in your component
// }
}

// getStatusText(event:any): string {
//   if (event.status === true) {
//       return 'Approved';
//   } else if (event.status === false) {
//       return 'Not Approved';
//   } else if (event.supplierOffer !== null) {
//       return 'Offer';
//   } else if (event.financeconfirmSatuts === null) {
//       return 'Waiting for Finance Approval';
//   } else if (event.poNum === null) {
//       return 'Waiting for PR';
//   } else {
//       return 'Open';
//   }
// }

// getStatusPRText(event:any): string {
//   if (event.statusPr === true) {
//       return 'Approved';
//   } else if (event.statusPr === false) {
//       return 'Rejected';
//   } else {
//       return 'Open';
//   }
// }
  getReuestList() {
    // this.loading2 = true; // Set loading to true before fetching data
    this.equipementService.GetAuthRequestList().subscribe(
      (data) => {
        this.equipmentRequests = data;
        // this.loading2 = false; // Set loading to false after data is fetched
        // this.filteredRequestList = data; // Initialize filtered list with original list
        console.log(this.equipmentRequests);
      },
      (error) => {
        // this.loading2 = true; // Ensure loading is turned off even in case of error
      }
    );
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
    } else if (anyPendingApproval) {
        return 'Pending';
    } else if (allRejected) {
        return 'Rejected';
    }

    return 'Unknown';
}
  filterRequests() {
    // Filter the list based on selected filter
    if (this.selectedFilter === null) {
      // Show all requests
      this.equipmentRequests = this.equipmentRequests;
    } else {
      // Filter based on selected approval status
      this.equipmentRequests.filter((equip: any) =>
        equip.requestStatus === this.selectedFilter
      );
    }
  }

}
