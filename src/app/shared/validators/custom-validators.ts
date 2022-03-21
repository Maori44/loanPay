import { fakeAsync } from '@angular/core/testing';
import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';

export class CustomValidators {
  // static passwordMatchValidator: ValidatorFn;
    
    static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } => {
          if (!control.value) {
            // if control is empty return no error
            return [];
          }
    
          // test the valyue of the control against the regexp supplied
          const valid = regex.test(control.value);
    
          // if true, return no error (no error), else return error passed in the second parameter
          return valid ? []: error;
        };
      }
    
      static passwordMatchValidator (control: any) {
        
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
          control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
      }
}
