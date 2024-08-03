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
  selectedSubRequest?:any;
  loading: boolean = true;
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredRequestList: any; // Variable to hold filtered list
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Approved', value: true },
    { label: 'Open', value: 'Open' },
    { label: 'Not Approved', value: false }
  ];
  visible: boolean = false;
  timelineEvents: any[] = [];
  mode: 'request' | 'subrequest' = 'request';
  Mysubrequest:any;

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


  constructor(private equipementService: EquipementRequestServiceService,private sharedService: SharedService, private router: Router) {

  }
  ngOnInit() {
    this.getReuestList();
  }

  showDialog(mode: 'request' | 'subrequest',req:any) {
    this.mode = mode;

    
  if (mode === 'request') {
    // Handle main request selection
    this.selectedRequest = req;
    this.selectedSubRequest = null; // Clear subrequest selection
  } else if (mode === 'subrequest') {
    // Handle subrequest selection
    this.selectedSubRequest = req;
    const selectedSubEquipmentRequestId = this.selectedSubRequest.subEquipmentRequestId;
    let selectedRequestunder = this.findSelectedRequest(selectedSubEquipmentRequestId);
    this.Mysubrequest=selectedRequestunder;
    console.log(this.Mysubrequest);


    // console.log(this.selectedRequest);
  }
    // console.log(req);
    this.visible = true;
    this.timelineEvents = [
      { title: 'Request Created',ForWho: req.isNewhire, Equipment: req.equipementName,Comments:req.comment,Quantity:req.qtEquipment },
      { title: 'Manager approval', date: req.departmangconfirmedAt, by: req.departementManagerName, RejectionCause: req.departmang_Not_confirmCause, statusManag: req.departmangconfirmStatus },
      { title: 'IT approval', date: req.iTconfirmedAt, by: req.itApproverName, RejectionCause: req.pR_Not_ConfirmCause, statusIT: req.iTconfirmSatuts, supplierOffer: this.Mysubrequest?.supplierOffer, PrStatus: this.getPRStatus(req.pR_Status, req), prnum: req.prNum  },
      { title: 'Finance approval', date: req.financeconfirmedAt, by: req.controllerName, RejectionCause: req.finance_Not_confirmCause, statusFina: req.financeconfirmSatuts },
      { title: 'Asset approval', date: req.iTconfirmedAt, statusreq: req.subRequestStatus}
    ];
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
  } else if (this.selectedSubRequest.departmangconfirmStatus === false || this.selectedSubRequest.pR_Status===false) {
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
    this.equipementService.GetAuthRequestList().subscribe(
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

  isRecentRequest(requestDate: string): boolean {
    const now = new Date();
    const requestDateTime = new Date(requestDate);
    const timeDifference = now.getTime() - requestDateTime.getTime();
    const timeDifferenceInMinutes = timeDifference / (1000 * 60);

    return timeDifferenceInMinutes < 7; // Checks if the request was made in the last 10 minutes
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

}
