import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type SidebarMode = 'full' | 'mini' | 'closed';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  currentSidebarMode = new BehaviorSubject<SidebarMode>('full');
  showFullSidebarOption: boolean = true;

  constructor() {}

  setSavedSidebarMode() {
    const isSAWSidebarMode = localStorage.getItem('SAW_Sidebar_Mode');

    if (isSAWSidebarMode !== null) {
      this.setSidebarMode(isSAWSidebarMode as SidebarMode);
    }
  }

  setSidebarMode(mode: SidebarMode) {
    this.currentSidebarMode.next(mode);

    localStorage.setItem('SAW_Sidebar_Mode', mode);
  }

  checkWindowDimension() {
    if (window.matchMedia('(max-width: 575.98px)').matches) {
      this.showFullSidebarOption = false;

      if (localStorage.getItem('SAW_Sidebar_Mode') === 'full') {
        this.setSidebarMode('closed');
      }
    } else {
      this.showFullSidebarOption = true;
    }
  }
}
