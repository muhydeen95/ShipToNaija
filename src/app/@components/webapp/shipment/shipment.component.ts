import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { Shipment } from '@core/interfaces/shipment.interface';
import { ShippingList } from '@core/jsons/shipping-list.json';
import { Observable } from 'rxjs';
import { FilterDialogComponent } from './dialogs/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss']
})
export class ShipmentComponent implements OnInit {
  selectedIndex: number = 0;
  isFetching: Observable<boolean>;

  shippingList: Shipment[] = ShippingList;
  types: any[] = ['All', 'Pending', 'Approved', 'Rejected'];

  instance: 'All' | 'Pending' | 'Approved' | 'Rejected' = 'All';

  currentType: string = 'All'

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  onTabChange(event: MatTabChangeEvent) {
    this.selectedIndex = event.index;
    
    this.router.navigate([], {
      queryParams: { tab: event.index },
      queryParamsHandling: 'merge',
    });
  }

  onChangeStatusTab(status: 'All' | 'Pending' | 'Approved' | 'Rejected') {
      this.currentType = this.instance = status;
      
  }

  onFilterDialog() {
    this.dialog.open(FilterDialogComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: 'filter-dialog',
      backdropClass: 'saw-dialog-backdrop',
    });
  }

}
