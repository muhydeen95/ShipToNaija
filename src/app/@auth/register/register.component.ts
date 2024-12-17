import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  step: number = 1;
  customerType: number;
  registerForm: FormGroup;
  isValid: boolean;
  email: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  getCustomerType(type: number) {
    this.customerType = type;
    
  }

  getFormValid(event: {isValid: boolean, email: string}) {
    this.isValid = event.isValid;
    this.email = event.email;

  }

  goBack(step: number) {
    if(step !== 4) {
      this.step = step - 1;
    }
  }

  onSubmit(step: number) {
    if(step === 3) {
      this.router.navigate(['/app/dashboard']);

    } else {
      this.step = step+ 1;
    }
  }

}
