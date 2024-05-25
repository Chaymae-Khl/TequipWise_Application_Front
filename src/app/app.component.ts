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


  constructor(
    private localStorageService: LocalStorageServiceService,
    private router: Router
  ) {}

  async ngOnInit() {
    const isAuthenticated = await this.localStorageService.isAuthenticated();
    if (isAuthenticated) {
      // Only check token expiry for protected routes
      const currentRoute = this.router.routerState.snapshot.url;
      const protectedRoutes = ['/admin']; // Add your protected routes here

      if (protectedRoutes.includes(currentRoute)) {
        const isTokenExpired = await this.localStorageService.checkTokenExpiry();

        if (isTokenExpired) {
          await this.router.navigate(['/tokenExpired']);
        }
      }
    }
  }
}
