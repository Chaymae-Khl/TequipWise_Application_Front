import { Component, OnInit } from '@angular/core';
import { EquipementServiceService } from '../../Services/equipement-service.service';
import { EquipementRequestServiceService } from '../../Services/equipement-request-service.service';
import { EquipmentRequest } from '../../Models/equipment-request';
import { error } from 'console';
import { MessageService } from 'primeng/api';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubRequest } from '../../Models/sub-request';
import { NotificationServiceService } from '../../Services/notification-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-equipment-request',
  templateUrl: './equipment-request.component.html',
  styleUrl: './equipment-request.component.css'
})
export class EquipmentRequestComponent implements OnInit{
  equipemnts: any;
  request: EquipmentRequest = new EquipmentRequest();
  loading: boolean = false;
  notifications: string[] = [];
  choices: any;

  constructor(
    private messageService: MessageService,
    private equipementService: EquipementServiceService,
    private requestService: EquipementRequestServiceService,
    private notificationService: NotificationServiceService,
    private router: Router,

  ) {
    this.request.equipmentSubRequests = [new SubRequest()];
  }
  ngOnInit() {
    this.getEquipmentNames();
    this.notificationService.startConnection();
    this.notificationService.getNotifications().subscribe(message => {
      console.log('Notification received in component: ', message);
      this.notifications.push(message);
    });
    this.choices = [
      { name: 'For me'},
      { name: 'For Another Employee'},
  
  ];
  }

  getEquipmentNames() {
    this.equipementService.getEquipmentName().subscribe(
      (data) => {
        this.equipemnts = data;
      },
      (error) => {
      }
    );
  }

  addSubRequest() {
    let newSubRequest = new SubRequest();
    this.request.equipmentSubRequests.push(newSubRequest);
  }

  removeSubRequest(index: number) {
    this.request.equipmentSubRequests.splice(index, 1);
  }

  ValidRequest() {
    this.loading = true;
    console.log(this.request)
    this.requestService.PassRequest(this.request).subscribe(
      (response: any) => {
        this.router.navigate(['/UserEquipementRequest']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: response.message,
          life: 10000
        });
        this.resetForm();
        
        this.loading = false;
      },
      (error) => {
        console.log("Error submitting request:", error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message
        });
        this.loading = false;
      }
    );
  }

  resetForm() {
    this.request = new EquipmentRequest();
    this.request.equipmentSubRequests = [new SubRequest()];
  }
}
