import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private selectedRequest: any;

  constructor() { }

  setSelectedRequest(request: any) {
    this.selectedRequest = request;
  }

  getSelectedRequest(): any {
    return this.selectedRequest;
  }
}
