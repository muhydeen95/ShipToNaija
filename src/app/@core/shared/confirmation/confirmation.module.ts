import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationComponent } from './confirmation.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  declarations: [ConfirmationComponent],
  imports: [CommonModule, SvgModule],
  exports: [ConfirmationComponent],
})
export class ConfirmationModule {}
