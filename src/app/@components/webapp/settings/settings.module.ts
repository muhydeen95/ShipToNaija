import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { GeneralLoaderModule } from '@core/shared/loaders/general-loader/general-loader.module';
import { SearchbarModule } from '@core/shared/searchbar/searchbar.module';
import { MatMenuModule } from '@angular/material/menu';
import { SvgModule } from '@core/shared/svg/svg.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { ProfileInfoComponent } from './profile-info/profile-info.component';

const routes: Routes = [
  {
    path: '',
    data: { permissions: ['Settings'] },
    component: SettingsComponent,
  },
];

@NgModule({
  declarations: [
    SettingsComponent, 
    ProfileInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRippleModule,
    MatTableModule,
    MatTabsModule,
    RouterModule.forChild(routes),
    SvgModule,
    MatMenuModule,
    SearchbarModule,
    GeneralLoaderModule,
  ],
})
export class SettingsModule {}
