import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageServiceService } from '../../Services/local-storage-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isAuthenticated: boolean;
  IsAdmin!:boolean;
  constructor(private route: ActivatedRoute,private localstorage:LocalStorageServiceService) {
    // Access the resolved data
    this.isAuthenticated = this.route.snapshot.data['isAuthenticated'];
  this.isReallyAdmin();
  }
  token=this.localstorage.getItem("token");
  isReallyAdmin() {
    this.localstorage.IsAdmin(this.token).subscribe(
      (isAdmin: boolean) => {
        if (isAdmin) {
          // User is an admin
          console.log('User is an admin');
          this.IsAdmin=true;
          // Add your logic for admin actions
        } else {
          // User is not an admin
          console.log('User is not an admin');
          this.IsAdmin=false;
          // Add your logic for non-admin actions
        }
      },
      (error: any) => {
        console.error('Error fetching admin status:', error);
        // Handle the error (e.g., show an error message)
      }
    );
  }

}
