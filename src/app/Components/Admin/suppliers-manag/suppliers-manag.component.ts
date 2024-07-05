import { Component, OnInit } from '@angular/core';
import { SupplierServiceService } from '../../../Services/supplier-service.service';
import { Supplier } from '../../../Models/supplier';
import { MessageService } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../../message-dialog/message-dialog.component';
import internal from 'stream';

@Component({
  selector: 'app-suppliers-manag',
  templateUrl: './suppliers-manag.component.html',
  styleUrl: './suppliers-manag.component.css'
})
export class SuppliersManagComponent implements OnInit {

  suppliers: any;
  visible: boolean = false;
  mode: 'add' | 'view' | 'update'|'Equipements' = 'add';
  selectedSupplier: any = {};
  searchTerm: string = '';
  supplier: Supplier = new Supplier();
  NumberSuppliers: any;
  loading2: boolean = true; // Initialize as true to show loading initially

  constructor(private SupplierService: SupplierServiceService, private messageService: MessageService, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.getSupliers();
    this.getnuberofSuppliers();
  }
  showDialog(mode: 'add' | 'view' | 'update'|'Equipements', supplier?: any): void {
    this.mode = mode;
    this.selectedSupplier = supplier ? { ...supplier } : {};
    this.visible = true;
  }
  getSupliers() {
    this.loading2 = true; // Set loading to true before fetching data

    this.SupplierService.getALlSupliers().subscribe(
      (data) => {
        this.suppliers = data;
        this.loading2 = false; // Set loading to false after data is fetched

        console.log(this.suppliers);
      },
      (error) => {
        this.loading2 = true; // Set loading to true before fetching data
        console.error('An error occurred while fetching Suppliers:', error);
        console.log('Error response:', error.error); // Log the response object
      }
    );
  }


  getnuberofSuppliers() {
    this.SupplierService.getNumberOfSuppliers().subscribe(
      (data) => {
        this.NumberSuppliers = data;
      },
      (error) => {
        console.error('An error occurred while fetching nuber of Suppliers:', error);
      }
    )
  }
  addSupplier() {

    this.SupplierService.AddSupplier(this.selectedSupplier).subscribe(
      (response) => {
        console.log('Supplier added successfully:', response);
        this.visible = false;
        this.getSupliers(); // Refresh the supplier list
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supplier Added successfully', life: 10000 });

      },
      (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Supplier Add failed', life: 10000 });
        console.error('Error adding supplier:', error);
      }
    );
  }


  deleteSupplier(id: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.SupplierService.DeleteSupplier(id).subscribe(
          (response) => {
            console.log('Supplier deleted successfully:', response);
            this.getSupliers(); // Refresh the supplier list
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
  updateSupplier(): void {

    const supplierId = this.selectedSupplier.suplierId; // Adjust according to your supplier ID field
    console.log(supplierId)
    this.SupplierService.UpdateSupplier(supplierId, this.selectedSupplier)
      .subscribe(response => {
        // handle the response
        this.getSupliers();
        this.visible = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Supplier Updated successfully', life: 10000 });

      },
        (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Supplier update failed', life: 10000 });
          console.log(error);

        }
      );

    
  }














}
