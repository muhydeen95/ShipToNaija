import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';
import { SvgModule } from '../svg/svg.module';

@NgModule({
  declarations: [TabsComponent],
  imports: [CommonModule, SvgModule],
  exports: [TabsComponent],
})
export class TabsModule {}
