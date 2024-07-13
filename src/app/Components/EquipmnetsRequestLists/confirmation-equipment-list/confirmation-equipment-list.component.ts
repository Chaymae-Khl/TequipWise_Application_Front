import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { EquipementRequestServiceService } from '../../../Services/equipement-request-service.service';

@Component({
  selector: 'app-confirmation-equipment-list',
  templateUrl: './confirmation-equipment-list.component.html',
  styleUrl: './confirmation-equipment-list.component.css'
})
export class ConfirmationEquipmentListComponent {
  expandedRows = {};
  equipmentRequests: any;
  selectedFilter: any = null; // Initialize to null for "All" by default
  filteredRequestList: any; // Variable to hold filtered list
  filterOptions: SelectItem[] = [
    { label: 'All', value: null },
    { label: 'Approved', value: true },
    { label: 'Not Approved', value: false }
  ];
  constructor(private equipementService: EquipementRequestServiceService) {

  }
  ngOnInit() {
    this.getReuestList();
    
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
