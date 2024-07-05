import { Component } from '@angular/core';
import { EquipementServiceService } from '../../../Services/equipement-service.service';
import { error } from 'console';
import { Equipment } from '../../../Models/equipment';
import { MessageService } from 'primeng/api';
import { MessageDialogComponent } from '../../../message-dialog/message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-equipment-manag',
  templateUrl: './equipment-manag.component.html',
  styleUrl: './equipment-manag.component.css'
})
export class EquipmentManagComponent {
  Equipments: any;
  NumberEquipments: any;
  visible: boolean = false;
  mode: 'add' | 'view' | 'update' = 'add';
  selectedEquipment: any = {};
  Equipment:Equipment=new Equipment();
  searchTerm: any;
  supliersNames:any;
  loading2: boolean = true; // Initialize as true to show loading initially

  constructor(private equipementService: EquipementServiceService,private messageService: MessageService,public dialog: MatDialog) { }
  ngOnInit(): void {
    this.getEquipments();
    this.getNumbersOfEquipements();
    this.getSuppliersName();
  }

  getEquipments() {
    this.loading2 = true; // Set loading to true before fetching data

    this.equipementService.getALlEquipements().subscribe(
      (data) => {
        this.Equipments = data;
        this.loading2 = false; // Set loading to false after data is fetched
        console.log(this.Equipments);
      },
      (error) => {
        this.loading2 = true; // Set loading to true before fetching data
        console.error('An error occurred while fetching Equipments:', error);
        console.log('Error response:', error.error); // Log the response object
      }
    );
  }
  getNumbersOfEquipements() {
    this.equipementService.getNumberOfEquipements().subscribe(
      (data) => {
        this.NumberEquipments = data;
      },
      (error) => {
        console.error('An error occurred while fetching number Of Equipements:', error);
        console.log('Error response:', error.error);
      }
    )
  }
  showDialog(mode: 'add' | 'view' | 'update', equipment?: any): void {
    this.mode = mode;
    this.selectedEquipment = equipment ? { ...equipment } : {};
    this.visible = true;
  }
  
  deleteEquipment(id:any){
    const dialogRef = this.dialog.open(MessageDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.equipementService.DeleteEquipement(id).subscribe(
          (response) => {
            console.log('Supplier deleted successfully:', response);
            this.getEquipments(); // Refresh the supplier list
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supplier deleted successfully', life: 10000 });
          },
          (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Supplier delete failed', life: 10000 });
            console.error('Error deleting supplier:', error);
          }
        );
      }
    });
  }

  addEquipement(){
    this.equipementService.AddEquipement(this.selectedEquipment).subscribe(
      (response) => {
        console.log('Supplier added successfully:', response);
        this.visible = false;
        this.getEquipments(); // Refresh the supplier list
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Equipment Added successfully', life: 10000 });

      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Equipment Add failed', life: 10000 });
        console.error('Error adding Equipment:', error);
      }
    );


  }
  updateEquipment(){
    const supplierId = this.selectedEquipment.equipementSN; // Adjust according to your supplier ID field
    console.log(supplierId)
    this.equipementService.UpdateEquipement(supplierId, this.selectedEquipment)
      .subscribe(response => {
        // handle the response
        this.getEquipments();
        this.visible = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Equipement Updated successfully', life: 10000 });

      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Equipment update failed', life: 10000 });
        console.log(error);
      }
    );
  }

  getSuppliersName(){
    this.equipementService.getsupplierName().subscribe
      (data=>{
    this.supliersNames=data;
    
      },
      (error)=>{
        console.log(error);
      }
    
    );
  }
}
