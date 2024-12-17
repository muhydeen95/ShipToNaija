import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  ActivatedRoute,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { regexValidator } from '@core/utils/helpers';
import { ThemeService } from '@core/services/theme.service';
import { AuthService } from '@core/services/auth.service';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loadingRouteConfig: boolean = false;
  year!: number;
  loginForm!: FormGroup;
  show: boolean = false;
  loginInstance: 'normal' | 'verifiedEmail' = 'normal';
  isFromDeveloperWebsite: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private themeService: ThemeService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.subscription.add(
      this.route.queryParams.subscribe((res) => {
        if (res?.developer) {
          this.isFromDeveloperWebsite = res?.developer;
        }
      })
    );
  }

  ngOnInit(): void {
    this.themeService.removeWebappThemes();

    this.listenToLazyLoadedModules();

    this.createLoginForm();
  }

  listenToLazyLoadedModules() {
    this.subscription.add(
      this.router.events.subscribe((event) => {
        window.scrollTo(0, 0);

        if (event instanceof RouteConfigLoadStart) {
          this.loadingRouteConfig = true;
        } else if (event instanceof RouteConfigLoadEnd) {
          this.loadingRouteConfig = false;
        }
      })
    );
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [
          Validators.required,
          regexValidator(new RegExp('^(?=.*?[A-Z])'), {
            uppercaseLetter: true,
          }),
          regexValidator(new RegExp('(?=.*?[a-z])'), { lowercaseLetter: true }),
          // regexValidator(new RegExp('(?=.*?[0-9])'), { number: true }),
          // regexValidator(new RegExp('(?=.*?[#?!@$%^&*-])'), {
          //   specialCharacter: true,
          // }),
          regexValidator(new RegExp('.{8,}$'), { minimum: true }),
        ],
      ],
    });
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  getErrorMessage(instance: string) {
    this.loginForm.get('email')?.updateValueAndValidity();
    if (
      instance === 'email' &&
      this.loginFormControls.email.hasError('required')
    ) {
      return 'Please enter your email';
    } else if (
      instance === 'email' &&
      this.loginFormControls.email.hasError('email')
    ) {
      return 'Sorry, this is not a valid email';
    } else if (
      instance === 'password' &&
      this.loginFormControls.password.hasError('required')
    ) {
      return 'Please enter your password';
    } else if (
      instance === 'password' &&
      this.loginFormControls['password'].hasError('uppercaseLetter')
    ) {
      return 'Your password must have at least 1 uppercase letter';
    } else if (
      instance === 'password' &&
      this.loginFormControls['password'].hasError('lowercaseLetter')
    ) {
      return 'Your password must have at least 1 lowercase letter.';
    } else if (
      instance === 'password' &&
      this.loginFormControls['password'].hasError('number')
    ) {
      return 'Your password must have at least a digit (0-9)';
    } else if (
      instance === 'password' &&
      this.loginFormControls['password'].hasError('specialCharacter')
    ) {
      return 'Your password must have at least a special character';
    } else if (
      instance === 'password' &&
      this.loginFormControls['password'].hasError('minimum')
    ) {
      return 'Your password must have at least a minimum of 8 characters.';
    } else {
      return;
    }
  }

  onLoginWithMicrosoft() {
    this.authService.initializeLoginWithAzureAD();
  }

  onSubmit() {
    this.document.body.classList.add('theme1');

    this.router.navigate(['/app']);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
