import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from './Services/local-storage-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'TequipWiseFront';
  constructor(private localStorageService: LocalStorageServiceService, private router: Router) {}

  async ngOnInit() {
    const isAuthenticated = await this.localStorageService.isAuthenticated();
    
    if (isAuthenticated) {
      const isTokenExpired = await this.localStorageService.checkTokenExpiry();
  
      if (isTokenExpired) {
        this.router.navigate(['/tokenExpired']);
      } else {
        // User is authenticated and token is not expired
        // Handle authenticated scenarios
      }
    } else {
      // User is not authenticated
      // Handle unauthenticated scenarios
    }
  }
}
