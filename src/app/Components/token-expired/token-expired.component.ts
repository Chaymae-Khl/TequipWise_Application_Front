import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../../Services/local-storage-service.service';

@Component({
  selector: 'app-token-expired',
  templateUrl: './token-expired.component.html',
  styleUrl: './token-expired.component.css'
})
export class TokenExpiredComponent {
  constructor(private router: Router,public localstorageService:LocalStorageServiceService) {}

  navigateToLogin() {
    
    this.localstorageService.removeItem('token');
    this.router.navigate(['/login']);
  }
}
