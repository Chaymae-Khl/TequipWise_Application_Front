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
  IsManger!:boolean;
  IsItApprover!:boolean;
  visible: boolean = false;

  constructor(private route: ActivatedRoute,private localStorageService:LocalStorageServiceService) {
    // Access the resolved data
    this.isAuthenticated = this.route.snapshot.data['isAuthenticated'];
 
  }
  ngOnInit(): void {
    this.checkRoles();
  }

  async checkRoles() {
    const token = await this.localStorageService.getItem("token");

    if (token) {
      this.localStorageService.IsAdmin(token).subscribe(
        (isAdmin: boolean) => {
          this.IsAdmin = isAdmin;
          console.log('Admin status:', isAdmin);
        },
        (error: any) => {
          console.error('Error fetching admin status:', error);
        }
      );

      this.localStorageService.IsManger(token).subscribe(
        (isManager: boolean) => {
          this.IsManger = isManager;
          console.log('Manager status:', isManager);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );

      this.localStorageService.IsItApprover(token).subscribe(
        (isItApprover: boolean) => {
          this.IsItApprover = isItApprover;
          console.log('Manager status:', isItApprover);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );

      
    } else {
      //console.error('No token found');
    }
  }


  showDialog(): void {
    this.visible = true;
  }
}
