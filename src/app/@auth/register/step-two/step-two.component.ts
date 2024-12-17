import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerType } from '@core/enums/auth.enum';
import { regexValidator } from '@core/utils/helpers';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.scss']
})
export class StepTwoComponent implements OnInit {
  loadingRouteConfig: boolean = false;
  @Input() customerType!: number;
  CustomerTypeEnum = CustomerType;
  registerForm!: FormGroup;
  show: boolean = false;
  cShow: boolean = false;
  loginInstance: 'normal' | 'verifiedEmail' = 'normal';
  isFromDeveloperWebsite: boolean = false;

  @Output() emitPrevStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() emitFormValid: EventEmitter<{isValid: boolean, email: string}> = new EventEmitter<{isValid: boolean, email: string}>();

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createRegisterForm();

  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      middleName: [null],
      phoneNo: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          regexValidator(new RegExp('^(?=.*?[A-Z])'), {
            uppercaseLetter: true,
          }),
          regexValidator(new RegExp('(?=.*?[a-z])'), { lowercaseLetter: true }),
          regexValidator(new RegExp('.{8,}$'), { minimum: true }),
        ],
      ],
      confirmPassword: [
        null, Validators.required
      ],
    },
    { validators: [this.passwordMatchValidator] }
  );
  }

  public passwordMatchValidator(f: FormGroup) {
    return f.get('password')?.value === f.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  get registerFormControls() {
    return this.registerForm.controls;
  }

  getErrorMessage(instance: string) {
    this.registerForm.get('email')?.updateValueAndValidity();

    if (
      instance === 'firstName' &&
      this.registerFormControls.firstName.hasError('required')
    ) {
      return 'Please enter your First name';
    } else if (
      instance === 'lastName' &&
      this.registerFormControls.lastName.hasError('required')
    ) {
      return 'Please enter your Last name';
    } else if (
      instance === 'phoneNo' &&
      this.registerFormControls.phoneNo.hasError('required')
    ) {
      return 'Please enter your Phone no.';
    } else if (
      instance === 'email' &&
      this.registerFormControls.email.hasError('required')
    ) {
      return 'Please enter your email';
    } else if (
      instance === 'email' &&
      this.registerFormControls.email.hasError('email')
    ) {
      return 'Sorry, this is not a valid email';
    } else if (
      instance === 'password' &&
      this.registerFormControls.password.hasError('required')
    ) {
      return 'Please enter your password';
    } else if (
      instance === 'password' &&
      this.registerFormControls['password'].hasError('uppercaseLetter')
    ) {
      return 'Your password must have at least 1 uppercase letter';
    } else if (
      instance === 'password' &&
      this.registerFormControls['password'].hasError('lowercaseLetter')
    ) {
      return 'Your password must have at least 1 lowercase letter.';
    } else if (
      instance === 'password' &&
      this.registerFormControls['password'].hasError('number')
    ) {
      return 'Your password must have at least a digit (0-9)';
    } else if (
      instance === 'password' &&
      this.registerFormControls['password'].hasError('specialCharacter')
    ) {
      return 'Your password must have at least a special character';
    } else if (
      instance === 'password' &&
      this.registerFormControls['password'].hasError('minimum')
    ) {
      return 'Your password must have at least a minimum of 8 characters.';
    } else if (
      instance === 'confirmPassword' &&
      this.registerFormControls['confirmPassword'].hasError('required')
    ) {
      return 'Please enter confirm password.';
    } else if (
      instance === 'confirmPassword' &&
      this.registerFormControls['password'].value !==
      this.registerFormControls['confirmPassword'].value
    ) {
      return 'Password must match.';
    } else {
      return;
    }
  }


  onKeyUp() {

    const isValid = this.registerForm.valid;

    this.emitFormValid.emit({isValid, email: this.registerForm.get('email')!.value});
  }

}
