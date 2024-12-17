import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInitialsComponent } from './user-initials.component';
import { PipesModule } from '../../pipes/pipes.module';
import { RandomColorModule } from '@directives/random-color/random-color.module';

@NgModule({
  declarations: [UserInitialsComponent],
  imports: [CommonModule, PipesModule, RandomColorModule],
  exports: [UserInitialsComponent],
})
export class UserInitialsModule {}
