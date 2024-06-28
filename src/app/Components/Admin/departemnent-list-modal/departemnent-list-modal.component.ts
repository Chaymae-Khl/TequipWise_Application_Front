import { Component, HostListener, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Plant } from '../../../Models/plant';
import { LocationServiceService } from '../../../Services/location-service.service';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { MessageService } from 'primeng/api';
import { Department } from '../../../Models/department';

@Component({
  selector: 'app-departemnent-list-modal',
  templateUrl: './departemnent-list-modal.component.html',
  styleUrl: './departemnent-list-modal.component.css'
})
export class DepartemnentListModalComponent {
  plant: Plant = new Plant();
  department: Department = new Department();
  users: any;
  controllers: any;
  ItApprovers:any;
  editingRowIndex:any;
  editingRowIndexDept:any;
  originalPlant: Plant | null = null;
  originalDept: Department | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authservice: AuthServiceService,
    public dialogRef: MatDialogRef<DepartemnentListModalComponent>,
    public locationService: LocationServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.getControllers();
    this.getItApprovers();
    this.getUsernames();
  }

  get getdata() {
    return this.data.data;
  }

  get isDepartment() {
    return this.data.type === 'department';
  }

  get isPlant() {
    return this.data.type === 'plant';
  }

  closeModal(): void {
    this.dialogRef.close();
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

  getItApprovers(): void {
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

  AddPlantToLocation() {
    this.locationService.addPlantToLocation(this.data.locationid, this.plant).subscribe(
      (response) => {
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Plant Added to location successfully', life: 10000 });
      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Plant Added failed', life: 10000 });
        console.error('Error adding plant:', error);
      }
    );
  }

  DeletePlantfromLocation(plantid: any) {
    this.locationService.DeletePlantFromLocation(this.data.locationid, plantid).subscribe(
      (response) => {
        const index = this.data.data.findIndex((plant: any) => plant.plantNumber === plantid);
        if (index !== -1) {
          this.data.data.splice(index, 1);
        }
        this.closeModal();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Plant deleted from location successfully', life: 10000 });
      },
      (error) => {
        this.closeModal();
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Plant delete failed', life: 10000 });
        console.error('Error deleting plant:', error);
      }
    );
  }

  editRow(index: number, event: Event) {
    this.editingRowIndex = index;
    this.originalPlant = { ...this.data.data[index] };
    event.stopPropagation();
  }

  saveRow() {
    if (this.editingRowIndex !== null && this.originalPlant) {
      const updatedPlant = this.data.data[this.editingRowIndex];
      this.locationService.UpdatePlantOfLocation(this.data.locationid, updatedPlant.plantNumber, updatedPlant).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Plant updated successfully', life: 10000 });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Plant update failed', life: 10000 });
          console.error('Error updating plant:', error);
          this.data.data[this.editingRowIndex] = { ...this.originalPlant };
        }
      );
      this.editingRowIndex = null;
      this.originalPlant = null;
    }
  }

  editRowdept(index: number, event: Event) {
    this.editingRowIndexDept = index;
    this.originalDept = { ...this.data.data[index] };
    event.stopPropagation();
  }

  saveRowDept() {
    if (this.editingRowIndexDept !== null && this.originalDept) {
      const updatedDept = this.data.data[this.editingRowIndexDept];
      this.locationService.UpdateDeptOfLocation(this.data.locationid, updatedDept.deptId, updatedDept).subscribe(
        (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Department updated successfully', life: 10000 });
        },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Department update failed', life: 10000 });
          console.error('Error updating department:', error);
          this.data.data[this.editingRowIndexDept] = { ...this.originalDept };
        }
      );
      this.editingRowIndexDept = null;
      this.originalDept = null;
    }
  }
//Location & department
AddDepartementToLocation(){
  this.locationService.addDepartementToLoaction(this.data.locationid,this.department).subscribe(
    (response) => {
      this.closeModal();
      // this.data.data.push(this.department);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Departement Added to location successfully', life: 10000 });
      console.log('plant added successfully:', response);
      
    },
    (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Departement Added failed', life: 10000 });

      console.error('Error adding supplier:', error);
    }
  );
}
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.editable-row');
    if (!clickedInside && this.editingRowIndex !== null) {
      this.saveRow();
    }
    if (!clickedInside && this.editingRowIndexDept !== null) {
      this.saveRowDept();
    }
  }

}
