import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageServiceService } from '../../Services/local-storage-service.service';
import { NotificationServiceService } from '../../Services/notification-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  isAuthenticated: boolean;
  IsAdmin!:boolean;
  IsManger!:boolean;
  ISManagerbackupAprover!:boolean;
  ISitbackupAprover!:boolean;
  IScONTROLLERbackupAprover!:boolean;
  IsApprover!:boolean;
  IsItApprover!:boolean;
  IsController!:boolean;
  visible: boolean = false;
  visible2: boolean = false;

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
      if (token) {
        this.localStorageService.IsApprover(token).subscribe(
          (isAdmin: boolean) => {
            this.IsApprover = isAdmin;
            console.log('Admin status:', isAdmin);
          },
          (error: any) => {
            console.error('Error fetching admin status:', error);
          }
        );}
  
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
      this.localStorageService.IsManagerBackupApprover(token).subscribe(
        (isBackup: boolean) => {
          this.ISManagerbackupAprover = isBackup;
          console.log('Manager status:', isBackup);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );
      this.localStorageService.IsControllerBackupApprover(token).subscribe(
        (isBackup: boolean) => {
          this.IScONTROLLERbackupAprover = isBackup;
          console.log('Manager status:', isBackup);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );
      this.localStorageService.IsITBackupApprover(token).subscribe(
        (isBackup: boolean) => {
          this.ISitbackupAprover = isBackup;
          console.log('Manager status:', isBackup);
        },
        (error: any) => {
          console.error('Error fetching manager status:', error);
        }
      );
      this.localStorageService.IsController(token).subscribe(
        (iscontroller: boolean) => {
          this.IsController = iscontroller;
          console.log('Manager status:', iscontroller);
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
  showDialog2(): void {
    this.visible2 = true;
  }
}
