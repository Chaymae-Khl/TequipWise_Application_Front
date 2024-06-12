import { Component } from '@angular/core';
import { EquipementServiceService } from '../../Services/equipement-service.service';
import { EquipementRequestServiceService } from '../../Services/equipement-request-service.service';
import { EquipmentRequest } from '../../Models/equipment-request';
import { error } from 'console';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-equipment-request',
  templateUrl: './equipment-request.component.html',
  styleUrl: './equipment-request.component.css'
})
export class EquipmentRequestComponent {
  checked!: boolean;
  equipemnts: any;
  request: EquipmentRequest = new EquipmentRequest();
  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private equipementService: EquipementServiceService,
    private RequestService: EquipementRequestServiceService
  ) {}

  ngOnInit() {
    this.getEquipmentNames();
  }

  getEquipmentNames() {
    this.equipementService.getEquipmentName().subscribe(
      (data) => {
        this.equipemnts = data;
        console.log(this.equipemnts);
      },
      (error) => {
        console.log("error displaying the equipemnts data", error);
      }
    );
  }

  ValidRequest() {
    this.loading = true; // Start loading
    console.log(this.request);
    this.RequestService.PassRequest(this.request).subscribe(
      (response: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: response.message,
          key: 'br',
          life: 10000
        });
        console.log(response);
        this.resetForm();
        this.loading = false; // Stop loading
      },
      (error) => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message
        });
        this.loading = false; // Stop loading
      }
    );
  }

  resetForm() {
    this.request = new EquipmentRequest();
  }
}
