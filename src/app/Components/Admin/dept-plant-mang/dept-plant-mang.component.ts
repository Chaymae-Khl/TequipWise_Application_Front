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
import { SapNumberServiceService } from '../../../Services/sap-number-service.service';
import { SapNumber } from '../../../Models/sap-number';
import { error } from 'console';


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
  mode2:'location'|'sapNumber'='location';
  checked: boolean = false;
  users: any;
  controllers:any;
  ItApprovers:any;
  selectedExistingPlantIds:any;
  searchTerm: string = '';
  loading2: boolean = true; // Initialize as true to show loading initially
  loading!: boolean ; // Initialize as true to show loading initially
 sapNumList!:any[];
 newsapNum:SapNumber=new SapNumber();
  //for the form repititions
  public locations: any[] = [{ name: '', buildingNumber: '' }];
  public departments: any[] = [{ departmentName: '', managerName: '', status: false }];
  public plantes: any[] = [{ plantName: '',sapNumber:'', approverName: '' }];

  constructor(private openDataServiceService: OpenDataServiceService,
    public dialog: MatDialog,
    private authservice: AuthServiceService,
    public locationService: LocationServiceService,
    private messageService: MessageService,
    private sapnumService:SapNumberServiceService
  ) {
    inject(NgZone).runOutsideAngular(() => {
      setInterval(() => { }, 1000);
    })
  }

  ngOnInit(): void {
    this.getPlants();
    this.getUsernames();
    this.getControllers();
    this.getITApprovers();
    this.getSapNum();
  }

  // Get plants method
  getPlants(): void {
    this.loading2 = true; // Set loading to true before fetching data

    this.openDataServiceService.getPlantsWDept().subscribe(
      (data: any) => {
        this.loading2 = false; // Ensure loading is turned off even in case of error
        this.plants = data;
        console.log(this.plants);
      },
      (error) => {
        this.loading2 = true; // Ensure loading is turned off even in case of error
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

  showDialog(mode:'location'|'sapNumber'): void {
    this.mode2=mode;
    this.visible = true;
  }


  //locaions crud
  AddNewLocation() {
    // Include plants and departments data in the location object
    this.loading = true; 
    this.location.plants = this.plantes;
    this.location.departments = this.departments;
    console.log(this.location);
    this.locationService.addLocation(this.location)
      .subscribe(
        response => {
          this.visible = false;
          this.loading = false;
          this.getPlants();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Location Added successfully', life: 10000 });
         
          console.log('Location created successfully:', response);
          // Reset the form or do any other necessary action
        },
        error => {
          this.loading = false;
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

  //SapNumbers operations
getSapNum(){
  this.sapnumService.getALSapNum().subscribe(
    (data: any) => {
      this.sapNumList = data;
    },
    (error) => {
      console.error('An error occurred while fetching sap number list:', error);
    }
  );
}
addSapNumber(){
  this.sapnumService.AddSapNum(this.newsapNum)
  .subscribe(
    response => {
      this.getSapNum();
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sap Number Added successfully', life: 10000 });
      // Reset the form or do any other necessary action
    },
    error => {
      console.error('Error creating sap number:', error);
      // Handle error, show error message, etc.
    }
  );
}

deleteSapNum(id:any){
this.sapnumService.DeleteSapNum(id).subscribe(
  response=>{
    this.getSapNum();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sap number deleted successfully', life: 10000 });

  },
  error=>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sap number delete failed, there is some relations depends on this SAP number', life: 10000 });

  }
);
}
updateSapNum(id:any,sapToUpdate:SapNumber){
this.sapnumService.UpdateSapNum(id,sapToUpdate).subscribe(
  response=>{
    this.getSapNum();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Sap number updated successfully', life: 10000 });

  },
  error=>{
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sap number update failed', life: 10000 });

  }
)
}
editSapNum(sap: any) {
  sap.isEditing = true;
}

saveSapNum(sap: any) {
  this.updateSapNum(sap.sApID, sap);
  sap.isEditing = false;
}

cancelEdit(sap: any) {
  sap.isEditing = false;
  this.getSapNum(); // Fetch the updated list to reset any changes
}
}
