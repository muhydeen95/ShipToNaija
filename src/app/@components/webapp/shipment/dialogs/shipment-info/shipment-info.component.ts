import { Component, OnInit } from '@angular/core';
import { DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'app-shipment-info',
  templateUrl: './shipment-info.component.html',
  styleUrls: ['./shipment-info.component.scss']
})
export class ShipmentInfoComponent implements OnInit {
  activeTab: number = 1;
  today = new Date();

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
  }

  onChangeTab(index: number) {
    this.activeTab = index;

  }

  closeDialog() {
    this.dialogService.close();
  }

}
