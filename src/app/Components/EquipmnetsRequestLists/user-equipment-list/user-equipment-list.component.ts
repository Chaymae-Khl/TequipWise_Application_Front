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
  constructor(private equipementService: EquipementRequestServiceService,private sharedService: SharedService, private router: Router) {

  }
  ngOnInit() {
    this.getReuestList();
  }
  showDialog(req:any) {
    this.selectedRequest = req;
   console.log(this.selectedRequest);

    this.visible = true;
}
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
  
  viewDetails(request: any) {
    this.sharedService.setSelectedRequest(request);
    this.router.navigate(['/RequestDetails']);
  }
  // Method to determine the overall status of the main request
  getRequestStatus(request: EquipmentRequest): string {
    if (!request || !request.equipmentSubRequests) {
        return 'Unknown';
    }

    const allSubRequests = request.equipmentSubRequests;
    const allApproved = allSubRequests.every((subRequest: SubRequest) => subRequest.subRequestStatus === true);
    const anyApproved = allSubRequests.some((subRequest: SubRequest) => subRequest.subRequestStatus === true);
    const allRejected = allSubRequests.every((subRequest: SubRequest) => subRequest.subRequestStatus === false);
    const allPending = allSubRequests.every((subRequest: SubRequest) => subRequest.subRequestStatus === null);

    if (request.requestStatus === null) {
        if (allPending) {
            return 'Open';
        } else if (anyApproved) {
            return 'Partly Approved';
        } else {
            return 'Pending';
        }
    } else if (request.requestStatus === true) {
        if (allApproved) {
            return 'Approved';
        }
    } else if (request.requestStatus === false) {
        if (allRejected) {
            return 'Rejected';
        }
    }

    return 'Unknown'; // Default case
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
