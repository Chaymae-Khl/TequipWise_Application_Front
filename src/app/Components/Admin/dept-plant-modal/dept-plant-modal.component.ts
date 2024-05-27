import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlantDeptService } from '../../../Services/plant-dept.service';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dept-plant-modal',
  templateUrl: './dept-plant-modal.component.html',
  styleUrl: './dept-plant-modal.component.css'
})
export class DeptPlantModalComponent {
   @Input() PlantData: any; // data passed into the modal
  @Output() save: EventEmitter<any> = new EventEmitter(); // event emitted out of the modal
  form: FormGroup;
  checked: boolean = false;

  constructor(private fb: FormBuilder, private deptService: PlantDeptService) {
    this.form = this.fb.group({
      locationSections: this.fb.array([]),
      departmentSections: this.fb.array([]),
      plantSections: this.fb.array([]),
    });

    // Add the initial sections
    this.addLocationSection();
    this.addDepartmentSection();
    this.addPlantSection();
  }

  get locationSections(): FormArray {
    return this.form.get('locationSections') as FormArray;
  }

  get departmentSections(): FormArray {
    return this.form.get('departmentSections') as FormArray;
  }

  get plantSections(): FormArray {
    return this.form.get('plantSections') as FormArray;
  }

  addLocationSection() {
    const section = this.fb.group({
      locationName: [''],
      buildingNumber: ['']
    });
    this.locationSections.push(section);
  }

  addDepartmentSection() {
    const section = this.fb.group({
      plantName: [''],
      approverName: ['']
    });
    this.departmentSections.push(section);
  }

  addPlantSection() {
    const section = this.fb.group({
      departmentName: [''],
      managerName: [''],
      status: [false]
    });
    this.plantSections.push(section);
  }

  onSave() {
    if (Object.keys(this.PlantData).length === 0) {
      // If PlantData is an empty object, a new plant is being added
      this.deptService.AddNewPlant(this.PlantData);
      console.log("plant added");
    } else {
      // Handle save operation for editing a plant here
    }
    this.save.emit(this.PlantData);
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
