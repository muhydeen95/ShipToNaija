import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DotStatusDirective } from './dot-status.directive';

@NgModule({
  declarations: [DotStatusDirective],
  imports: [CommonModule],
  exports: [DotStatusDirective],
})
export class DotStatusModule {}
