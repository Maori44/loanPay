import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'control-messages',
  template: `<span *ngIf="errorMessage != null">{{ errorMessage }}</span>`,
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  @Input() fieldName: string;
  @Input() msg: string;

  get errorMessage() {
    let error: any = this.control.errors;
    if (error != null) {
      for (let propertyName in error) {
        if (error.hasOwnProperty(propertyName)) {
          return ValidationService.getValidatorErrorMessage(
            propertyName,
            error[propertyName],
            this.fieldName
          );
        }
      }
    }
    return null
  }
}
