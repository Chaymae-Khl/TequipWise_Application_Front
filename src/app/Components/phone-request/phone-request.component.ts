import { Component, OnInit } from '@angular/core';
import { PhoneRequest } from '../../Models/phone-request';
import { PhoneRequestServiceService } from '../../Services/phone-request-service.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-phone-request',
  templateUrl: './phone-request.component.html',
  styleUrl: './phone-request.component.css'
})
export class PhoneRequestComponent implements OnInit{
  choices: any;
  requesttype:any;
  replacementtype:any;
  Assettype:any;
  loading: boolean = false;
  phoneRequest:PhoneRequest=new PhoneRequest();

    
    constructor(private phoneService: PhoneRequestServiceService,    private router: Router,  private messageService: MessageService){
  }
  ngOnInit() {
    
 this.choices = [
      { name: 'For me'},
      { name: 'For Another Employee'},
  
  ];
  this.requesttype = [
    { name: 'New'},
    { name: 'Replacement'},

];
this.replacementtype = [
  { name: 'Renewal'},
  { name: 'Loss'},
  { name: 'Repair'},


];
this.Assettype = [
  { name: 'Phone'},
  { name: 'Modem'}
];
  }
  PassPhoneRequest() {
    this.loading = true;
    this.phoneService.PassRequest(this.phoneRequest).subscribe(
      (response: any) => {
        console.log('response:',response)
        // Handle based on response status
        if (response.status === 'Success') {
          // Success: Proceed with redirection
          this.router.navigate(['/UserPhoneRequest']);
          this.messageService.add({
            severity: 'success',
            summary: 'Success Message',
            detail: response.message,
            life: 10000
          });
        } else if (response.status === 'Denied') {
          // Denied: Show a warning, no redirection
          this.messageService.add({
            severity: 'warn',
            summary: 'Request Denied',
            detail: response.message,
            life: 10000
          });
        } else if (response.status === 'Error') {
          // Error: Show an error message, no redirection
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: response.message,
            life: 10000
          });
        }
  
        this.loading = false; // Ensure loading spinner is removed after response
      },
      (error) => {
        console.log("Error submitting request:", error);
        // Handle generic errors
        this.messageService.add({
          severity: 'error',
          summary: 'Submission Error',
          detail: 'An error occurred while submitting the request. Please try again later.',
          life: 10000
        });
        this.loading = false;
      }
    );
  }
}
