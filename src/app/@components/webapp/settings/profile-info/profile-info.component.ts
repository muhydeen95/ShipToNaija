import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notification } from '@core/interfaces';
import { NotificationService } from '@core/services/notification.service';
import { regexValidator } from '@core/utils/helpers';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  step: number = 1;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  password: boolean = false;
  newPassword: boolean = false;
  cPassword: boolean = false;

  address: any[] = [
    {id: 1, title: 'Atlanta Warehouse', address: '3770 Zip Industrial Blvd SE suite d, Atlanta, GA 30354, USA.'},
    {id: 2, title: 'Atlanta Warehouse', address: '3770 Zip Industrial Blvd SE suite d, Atlanta, GA 30354, USA.'},
    {id: 3, title: 'Atlanta Warehouse', address: '3770 Zip Industrial Blvd SE suite d, Atlanta, GA 30354, USA.'},
  ];

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createprofileForm();

  }

  createprofileForm() {
    this.profileForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      middleName: [null],
      phoneNo: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
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
    }, { validators: [this.passwordMatchValidator] }
  );

  }

  public passwordMatchValidator(f: FormGroup) {
    return f.get('password')?.value === f.get('confirmPassword')?.value
      ? null
      : { passwordMismatch: true };
  }

  get profileFormControls() {
    return this.profileForm.controls;
  }

  get passwordFormControls() {
    return this.passwordForm.controls;
  }

  getErrorMessage(instance: string) {
    this.profileForm.get('email')?.updateValueAndValidity();

    if (
      instance === 'firstName' &&
      this.profileFormControls.firstName.hasError('required')
    ) {
      return 'Please enter your First name';
    } else if (
      instance === 'lastName' &&
      this.profileFormControls.lastName.hasError('required')
    ) {
      return 'Please enter your Last name';
    } else if (
      instance === 'phoneNo' &&
      this.profileFormControls.phoneNo.hasError('required')
    ) {
      return 'Please enter your Phone no.';
    } else if (
      instance === 'email' &&
      this.profileFormControls.email.hasError('required')
    ) {
      return 'Please enter your email';
    } else if (
      instance === 'email' &&
      this.profileFormControls.email.hasError('email')
    ) {
      return 'Sorry, this is not a valid email';
    } else if (
      instance === 'oldPassword' &&
      this.passwordFormControls.oldPassword.hasError('required')
    ) {
      return 'Please enter your current password';
    } else if (
      instance === 'password' &&
      this.passwordFormControls.password.hasError('required')
    ) {
      return 'Please enter your new password';
    } else if (
      instance === 'password' &&
      this.passwordFormControls['password'].hasError('uppercaseLetter')
    ) {
      return 'Your password must have at least 1 uppercase letter';
    } else if (
      instance === 'password' &&
      this.passwordFormControls['password'].hasError('lowercaseLetter')
    ) {
      return 'Your password must have at least 1 lowercase letter.';
    } else if (
      instance === 'password' &&
      this.passwordFormControls['password'].hasError('number')
    ) {
      return 'Your password must have at least a digit (0-9)';
    } else if (
      instance === 'password' &&
      this.passwordFormControls['password'].hasError('specialCharacter')
    ) {
      return 'Your password must have at least a special character';
    } else if (
      instance === 'password' &&
      this.passwordFormControls['password'].hasError('minimum')
    ) {
      return 'Your password must have at least a minimum of 8 characters.';
    } else if (
      instance === 'confirmPassword' &&
      this.passwordFormControls['confirmPassword'].hasError('required')
    ) {
      return 'Please enter confirm password.';
    } else if (
      instance === 'confirmPassword' &&
      this.passwordFormControls['password'].value !==
      this.passwordFormControls['confirmPassword'].value
    ) {
      return 'Password must match.';
    } else {
      return;
    }
  }

  onSubmit() {
    const notification: Notification = {
      state: 'success',
      message: `Updated successfully`,
    };

    this.notificationService.openNotification(
      notification,
      'saw-notification-success'
    );
  }

}
