import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../../Services/local-storage-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit{
  isNavbarOpen = false;
  
constructor(private authservice:AuthServiceService,private router: Router,private localstorgeService:LocalStorageServiceService ){
  
}
  ngOnInit(): void {
  }

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
  isLoggedIn(): boolean {
    // Check if token exists in localStorage
    return !!this.localstorgeService.getItem('token');
  }

  logout(): void {
    this.authservice.logout();
    this.router.navigate(['/']);
  }
}
