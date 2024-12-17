import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusDirective } from './status.directive';

@NgModule({
  declarations: [StatusDirective],
  imports: [CommonModule],
  exports: [StatusDirective],
})
export class StatusModule {}
