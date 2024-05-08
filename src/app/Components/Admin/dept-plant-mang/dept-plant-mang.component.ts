import { Component, OnInit } from '@angular/core';
import { OpenDataServiceService } from '../../../Services/open-data-service.service';
import { DepartemnentListModalComponent } from '../departemnent-list-modal/departemnent-list-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Plant } from '../../../Models/plant';
import { DeptPlantModalComponent } from '../dept-plant-modal/dept-plant-modal.component';


@Component({
  selector: 'app-dept-plant-mang',
  templateUrl: './dept-plant-mang.component.html',
  styleUrl: './dept-plant-mang.component.css'

})
export class DeptPlantMangComponent implements OnInit {
  displayedColumns: string[] = ['Building Number', 'Location', 'Plant Name', 'Plant Manager','Departements','Actions'];
  plants!: Plant[]; // Use Plant type array
  
  constructor(private openDataServiceService: OpenDataServiceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPlants();
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

  // Open department modal function
  openDepartmentModal(plant: Plant): void {
    const dialogRef = this.dialog.open(DepartemnentListModalComponent, {
      width: '400px',
      data: { departments: plant.departments }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  openAddDepartmentModal(): void {
    const dialogRef = this.dialog.open(DeptPlantModalComponent, {
      width: '400px',
      data: { department: {} } // Pass an empty object for adding a new department
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // If result is not null, a new department was added
        this.plants.push(result); // Add the new department to the plants array
      }
    });
  }


  
}
