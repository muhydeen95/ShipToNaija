import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  selectedIndex: number = 0;
  today = new Date();

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {}


  onTabChange(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
    
    this.router.navigate([], {
      queryParams: { tab: event.index },
      queryParamsHandling: 'merge',
    });
  }

}
