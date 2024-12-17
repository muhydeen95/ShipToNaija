import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateTextDirective } from './generate-text.directive';

@NgModule({
  declarations: [GenerateTextDirective],
  imports: [CommonModule],
  exports: [GenerateTextDirective],
})
export class GenerateTextModule {}
