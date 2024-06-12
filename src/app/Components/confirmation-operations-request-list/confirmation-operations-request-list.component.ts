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
