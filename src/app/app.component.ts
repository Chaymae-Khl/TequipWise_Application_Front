import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageServiceService } from './Services/local-storage-service.service';
import { filter } from 'rxjs';

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
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(async () => {
      const isAuthenticated = await this.localStorageService.isAuthenticated();
      if (isAuthenticated) {
        const currentRoute = this.router.routerState.snapshot.url;
        const protectedRoutes = ['/admin','/Menu']; // Add your protected routes here

        if (protectedRoutes.includes(currentRoute)) {
          const isTokenExpired = await this.localStorageService.checkTokenExpiry();

          if (isTokenExpired) {
            await this.router.navigate(['/tokenExpired']);
          }
        }
      }
    });
  }
}
