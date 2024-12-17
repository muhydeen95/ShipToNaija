import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface TabItem {
  id: any;
  title: string;
  active: boolean;
  svgPath?: string;
}

@Component({
  selector: 'app-saw-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent implements OnInit {
  @Input() tabs: TabItem[] = [];
  @Input() type: any;
  @Input() layout: 'row' | 'column' = 'row';

  @Output() tabClicked = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    console;
  }

  setActiveTab(id: any): void {
    this.tabClicked.emit(id);
  }
}
