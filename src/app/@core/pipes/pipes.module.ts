import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapPipe } from './map.pipe';
import { UnsafePipe } from './unsafe.pipe';

const Pipes = [ MapPipe, UnsafePipe];
@NgModule({
  declarations: [Pipes],
  imports: [CommonModule],
  exports: [Pipes],
})
export class PipesModule {}
