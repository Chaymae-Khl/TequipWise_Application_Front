import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
   
  // Validator to check if two fields match
  static passwordsMatch(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  // Validator for a strong password
  static strongPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) {
      return null;
    } else {
      return { weakPassword: true };
    }
  }

  // Validator for email pattern
  static emailPattern(control: AbstractControl): ValidationErrors | null {
    const email = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailPattern.test(email)) {
      return null;
    } else {
      return { invalidEmail: true };
    }
  }
}