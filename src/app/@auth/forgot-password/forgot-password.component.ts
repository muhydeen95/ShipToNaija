import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

declare let IN: any;
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isLoading!: Observable<boolean>;
  emailControl: FormControl = new FormControl(null, [
    Validators.required,
    Validators.email,
  ]);
  year!: number;
  routerEvents: Subscription;

  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {

    this.year = new Date().getFullYear();
  }

  onSubmit() {

   
  }
}
