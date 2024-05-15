import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  // Custom validator for checking if a control value is required
  static required(control: AbstractControl): ValidationErrors | null {
    return control.value ? null : { required: true };
  }

  // Add more custom validators here as needed
}