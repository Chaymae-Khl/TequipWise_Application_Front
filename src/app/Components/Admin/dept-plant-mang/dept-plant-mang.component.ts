import { Component, NgZone, OnInit, inject } from '@angular/core';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
import { DepartemnentListModalComponent } from '../departemnent-list-modal/departemnent-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { DeptPlantModalComponent } from '../dept-plant-modal/dept-plant-modal.component';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { LocationServiceService } from '../../../Services/location-service.service';
import { response } from 'express';
import { Location } from '../../../Models/location';
import { MessageService } from 'primeng/api';
import { MessageDialogComponent } from '../../../message-dialog/message-dialog.component';


@Component({
  selector: 'app-dept-plant-mang',
  templateUrl: './dept-plant-mang.component.html',
  styleUrl: './dept-plant-mang.component.css'

})
export class DeptPlantMangComponent implements OnInit {
  displayedColumns: string[] = ['Location', 'buildingNumber', 'Plants', 'Departements', 'Actions'];
  plants: any; // Use Plant type array
  visible: boolean = false;
  location: Location = new Location();
  mode: 'add' | 'view' | 'update' = 'add';
  checked: boolean = false;
  users: any;
  controllers:any;
  ItApprovers:any;
  selectedExistingPlantIds:any;
  searchTerm: string = '';
  //for the form repititions
  public locations: any[] = [{ name: '', buildingNumber: '' }];
  public departments: any[] = [{ departmentName: '', managerName: '', status: false }];
  public plantes: any[] = [{ plantName: '',sapNumber:'', approverName: '' }];

  constructor(private openDataServiceService: OpenDataServiceService,
    public dialog: MatDialog,
    private authservice: AuthServiceService,
    public locationService: LocationServiceService,
    private messageService: MessageService) {
    inject(NgZone).runOutsideAngular(() => {
      setInterval(() => { }, 1000);
    })
  }

  ngOnInit(): void {
    this.getPlants();
    this.getUsernames();
    this.getControllers();
    this.getITApprovers();
  }

  // Get plants method
  getPlants(): void {
    this.openDataServiceService.getPlantsWDept().subscribe(
      (data: any) => {
        this.plants = data;

        console.log(this.plants);
      },
      (error) => {
        console.error('An error occurred while fetching plants:', error);
        console.log('Error response:', error.error);
      }
    );
  }


  //getusersNames
  getUsernames(): void {
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.users = data.map((user: any) => ({
          ...user,
          fullName: `${user.teNum} (${user.userName})`
        }));
      },
      (error) => {
        console.error('An error occurred while fetching Users:', error);
      }
    );
  }

  getControllers(): void {
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.controllers = data
          .filter((user: any) => user.roles && user.roles.includes('Controller'))
          .map((user: any) => ({
            ...user,
            fullName: `${user.teNum} (${user.userName})`
          }));
      },
      (error) => {
        console.error('An error occurred while fetching Users:', error);
      }
    );
  }
  getITApprovers(): void {
    this.authservice.getUsers().subscribe(
      (data: any) => {
        this.ItApprovers = data
          .filter((user: any) => user.roles && user.roles.includes('It Approver'))
          .map((user: any) => ({
            ...user,
            fullName: `${user.teNum} (${user.userName})`
          }));
      },
      (error) => {
        console.error('An error occurred while fetching Users:', error);
      }
    );
  }

  showDialog(): void {
    this.visible = true;
  }


  //locaions crud
  AddNewLocation() {
    // Include plants and departments data in the location object
    this.location.plants = this.plantes;
    this.location.departments = this.departments;
    console.log(this.location);
    this.locationService.addLocation(this.location)
      .subscribe(
        response => {
          this.visible = false;
          this.getPlants();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location Added successfully', life: 10000 });
         
          console.log('Location created successfully:', response);
          // Reset the form or do any other necessary action
        },
        error => {
          console.error('Error creating location:', error);
          // Handle error, show error message, etc.
        }
      );
  }

  deleteLocation(id: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.locationService.DeleteLocation(id).subscribe(
          (response) => {
            console.log('Supplier deleted successfully:', response);
            this.getPlants(); // Refresh the supplier list
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location deleted successfully', life: 10000 });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Location delete failed, there is some relations depends on this Locations', life: 10000 });
            console.error('Error deleting supplier:', error);
          }
        );
      }
    });
  }



  //method to duplicate the forms
  addDepartment(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.departments.push({ departmentName: '', managerName: '', status: false  });
  }
  
  addPlant(event: Event): void {
    event.preventDefault(); // Prevent form submission
    this.plantes.push({ plantName: '', approverName: '',ApproverId:0 });
  }


  // Open department modal function
  openDepartmentModal(plant: any, type: 'department' | 'plant'): void {
    const dialogRef = this.dialog.open(DepartemnentListModalComponent, {
      width: '800',
      data: {
        data: type === 'department' ? plant.departments : plant.plants,
        locationid:plant.locationId,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }



  


}
