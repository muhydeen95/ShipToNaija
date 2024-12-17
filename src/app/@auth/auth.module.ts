import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { GeneralLoaderModule } from '../@core/shared/loaders/general-loader/general-loader.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { PipesModule } from '../@core/pipes/pipes.module';
import { RandomColorModule } from '../@directives/random-color/random-color.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { NotificationModule } from '../@core/shared/notification/notification.module';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { SvgModule } from '@core/shared/svg/svg.module';
import { StepOneComponent } from './register/step-one/step-one.component';
import { StepTwoComponent } from './register/step-two/step-two.component';
import { StepThreeComponent } from './register/step-three/step-three.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    AuthComponent,
    RegisterComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDialogModule,
    MatMenuModule,
    GeneralLoaderModule,
    PipesModule,
    RandomColorModule,
    NotificationModule,
    SvgModule
  ],
})
export class AuthModule {}
