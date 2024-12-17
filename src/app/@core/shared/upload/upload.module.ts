import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { SvgModule } from '../svg/svg.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [UploadComponent],
  imports: [CommonModule, SvgModule, MatProgressSpinnerModule],
  exports: [UploadComponent],
})
export class UploadModule {}
