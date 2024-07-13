import { Component } from '@angular/core';
import { SharedService } from '../../../Services/shared.service';

@Component({
  selector: 'app-equipment-request-details',
  templateUrl: './equipment-request-details.component.html',
  styleUrl: './equipment-request-details.component.css'
})
export class EquipmentRequestDetailsComponent {
  requestDetails: any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
  
    this.requestDetails = this.sharedService.getSelectedRequest();
  }
}
