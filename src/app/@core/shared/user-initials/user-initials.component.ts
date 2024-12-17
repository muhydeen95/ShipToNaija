import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-initials',
  templateUrl: './user-initials.component.html',
  styleUrls: ['./user-initials.component.scss'],
})
export class UserInitialsComponent {
  @Input() user: any;

  constructor() {}
}
