import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomColorDirective } from './random-color.directive';

@NgModule({
  declarations: [RandomColorDirective],
  imports: [CommonModule],
  exports: [RandomColorDirective],
})
export class RandomColorModule {}
