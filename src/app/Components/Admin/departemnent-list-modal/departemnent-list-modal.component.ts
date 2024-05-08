import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-departemnent-list-modal',
  templateUrl: './departemnent-list-modal.component.html',
  styleUrl: './departemnent-list-modal.component.css'
})
export class DepartemnentListModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<DepartemnentListModalComponent>) {}

  get departments() {
    return this.data.departments;
  }
  // Close dialog method
  closeModal(): void {
    this.dialogRef.close();
  }
}
