import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Services/auth-service.service';
import { Router } from '@angular/router';
import { LocalStorageServiceService } from '../../Services/local-storage-service.service';
import { resolve } from 'path';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',

})
export class NavBarComponent implements OnInit {
  isAuthenticated!: boolean;
  isNavbarOpen = false;
 
  authUser: any={};
  constructor(private authservice: AuthServiceService, private router: Router, private localstorgeService: LocalStorageServiceService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.isLoggedIn();
    this.getAuthUseer();
   
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

  getAuthUseer() {
    this.authservice.getAuthuser().subscribe(
      (data) => {
        this.authUser = data;
        console.log(this.authUser);
      },
      (error) => {
       
      }
    )
  }



  
}
