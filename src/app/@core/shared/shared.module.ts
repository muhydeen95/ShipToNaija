import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'swiper/angular';
import { PipesModule } from '../pipes/pipes.module';
import { HamburgerComponent } from './hamburger/hamburger.component';
import { GeneralLoaderModule } from './loaders/general-loader/general-loader.module';
import { TableLoaderModule } from './loaders/table-loader/table-loader.module';
import { ButtonLoaderModule } from './loaders/button-loader/button-loader.module';
import { NotificationModule } from './notification/notification.module';
import { RandomColorModule } from '@directives/random-color/random-color.module';
import { StatusModule } from '@directives/status/status.module';
import { DotStatusModule } from '@directives/dot-status/dot-status.module';
import { WebappCardComponent } from './webapp-card/webapp-card.component';
import { LoadingButtonComponent } from './loading-button/loading-button.component';
import { LoaderComponent } from './loader/loader.component';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SwiperModule,
  PipesModule,
  GeneralLoaderModule,
  TableLoaderModule,
  ButtonLoaderModule,
  NotificationModule,
  RandomColorModule,
  StatusModule,
  DotStatusModule
];

const components = [HamburgerComponent, LoadingButtonComponent, LoaderComponent];

@NgModule({
  declarations: [components, WebappCardComponent],
  imports: [modules],
  exports: [modules, components],
})
export class SharedModule {}
