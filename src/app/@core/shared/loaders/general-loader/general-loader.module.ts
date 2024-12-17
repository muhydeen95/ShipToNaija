import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralLoaderComponent } from './general-loader.component';

@NgModule({
  declarations: [GeneralLoaderComponent],
  imports: [CommonModule],
  exports: [GeneralLoaderComponent],
})
export class GeneralLoaderModule {}
