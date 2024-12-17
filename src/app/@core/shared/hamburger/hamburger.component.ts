import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.scss'],
})
export class HamburgerComponent {
  @Input() isSidebarToggled: Observable<any>;

  @Output() sidebarEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  toggleSidebar() {
    this.sidebarEvent.emit(true);
  }
}
