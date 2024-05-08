import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlantDeptService } from '../../../Services/plant-dept.service';

@Component({
  selector: 'app-dept-plant-modal',
  templateUrl: './dept-plant-modal.component.html',
  styleUrl: './dept-plant-modal.component.css'
})
export class DeptPlantModalComponent {
  @Input() PlantData: any; // data passed into the modal
  @Output() save: EventEmitter<any> = new EventEmitter(); // event emitted out of the modal
constructor(private deptService:PlantDeptService){}
  onSave() {
    if (Object.keys(this.PlantData).length === 0) {
      // If departmentData is an empty object, a new department is being added
       this.deptService.AddNewPlant(this.PlantData);
       console.log("plant added");
    } else {
      // If departmentData is not an empty object, an existing department is being edited
      // Handle save operation for editing a department here
    }
    this.save.emit(this.PlantData);
  }
}
