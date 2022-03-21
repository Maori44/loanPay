export class ValidationService {
  static getValidatorErrorMessage(
    validatorName: string,
    validatorValue?: any,
    fieldName?: any
  ) {
    var field = fieldName;
    if (!field) {
      return;
    }
    while (field.charAt(0) === '*') {
      field = field.substr(1);
    }

    let config: any = {
      required: `*${fieldName} is Required.`,
      invalidEmailAddress: `Please enter a valid email address.`,
      minlength: `The Minimum length should be ${validatorValue.requiredLength} character.`,
      maxlength: `The Maximum length should be ${validatorValue.requiredLength} character.`,
      invalidPassword: `Please enter valid ${field}`,
      minlength3: `The length should be minimum 3 characters`,
      maxlength50: `The length should be maximum 50 characters`,
      InvalidFieldName: `Please enter valid ${field}`,
      invalidCreditCard: `Please enter valid number`,
    };
    return config[validatorName];
  }

  static passwordValidator(control: any) {
    if (control.value) {
      if (control.value.length < 3) {
        return { minlength: true };
      }
      if (
        control.value.match(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,20}$/
        )
      ) {
        return null;
      } else {
        return { invalidPassword: true };
      }
    } else {
      return null;
    }
  }

  static EmailorMobileNumberValidator(control: any) {
    if (control.value && control.value != '' && control.value != null) {
      if (control.value.toString().trimRight().trimLeft().length < 3) {
        return { minlength3: true };
      }
      if (control.value.trimRight().trimLeft().length > 50) {
        return { maxlength50: true };
      }
      if (control.value.toString().startsWith('0')) {
        return { InvalidFieldName: true };
      }
      if (control.value.toString().startsWith('+')) {
        var _val = control.value.toString();
        var _value = _val.substr(1);
        if (_value.match(/^[0-9]{10,18}$/)) {
          return null;
        } else {
          return { InvalidFieldName: true };
        }
      }
      if (control.value.includes('@')) {
        if (
          control.value
            .toString()
            .match(
              /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
            )
        ) {
          return null;
        } else {
          return { InvalidFieldName: true };
        }
      } else {
        return { InvalidFieldName: true };
      }
    } else {
      return null;
    }
  }

  static creditCardValidator(control: any) {
    if (
      control.value.match(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/
      )
    ) {
      return null;
    } else {
      return { InvalidCreditCard: true };
    }
  }
}
