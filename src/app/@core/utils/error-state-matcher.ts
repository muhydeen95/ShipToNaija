import { FormControl, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyPasswordErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null
    // form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    let invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );

    if (control?.parent?.errors) {
      invalidParent = !!control?.parent?.errors.paswordNotSame;
    }
    return invalidCtrl || invalidParent;
  }

  confirmPasswordValidation(group: FormGroup) {
    const passwordCtrl = group.controls.new_password.value;
    const confirmPasswordCtrl = group.controls.confirm_password.value;

    return passwordCtrl === confirmPasswordCtrl
      ? null
      : { paswordNotSame: true };
  }
}
