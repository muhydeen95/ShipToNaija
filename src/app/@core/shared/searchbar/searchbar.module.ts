import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchbarComponent } from './searchbar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SvgModule } from '../svg/svg.module';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [SearchbarComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    SvgModule,
  ],
  exports: [SearchbarComponent],
})
export class SearchbarModule {}
