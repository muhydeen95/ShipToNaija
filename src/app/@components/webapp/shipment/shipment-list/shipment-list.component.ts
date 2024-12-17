import { 
  Component, 
  OnInit,
  Input, 
  SimpleChanges, 
  OnChanges, 
  Output, 
  EventEmitter 
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { Notification } from '@core/interfaces';
import { NotificationService } from '@core/services/notification.service';
import { ShipmentInfoComponent } from '../dialogs/shipment-info/shipment-info.component';
import { DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'app-shipment-list',
  templateUrl: './shipment-list.component.html',
  styleUrls: ['./shipment-list.component.scss']
})
export class ShipmentListComponent implements OnInit, OnChanges {
  @Input() shippingList: any[];
  displayedColumns: string[] = [
    'select',
    'shipmentId',
    'courier',
    'date',
    'destination',
    'trackingNo',
    'approvalStatus',
    'paymentStatus',
    'status',
    'action',
  ];
  dataSource: MatTableDataSource<any> | null = null;
  selection = new SelectionModel<any>(true, []);
  @Input() isFetching!: Observable<any>;
  @Input() instance: 'All' | 'Pending' | 'Approved' | 'Rejected';

  @Output() branchEvent: EventEmitter<any> = new EventEmitter<any>();
 
  constructor(
    private notificationService: NotificationService,
    private dialogService: DialogService
   ) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.shippingList!);

  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource?.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
  
  
        return;
      }
  
      this.selection.select(...this.dataSource!.data);
    }
  
    onCheckboxChange(row: any, event: any) {
      this.selection.toggle(row);
  
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: any): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
        row.position + 1
      }`;
    }

    copyLink(shipmentId: string) {
      navigator.clipboard.writeText(shipmentId);
  
      const notification: Notification = {
        state: 'success',
        message: `Copied successfully`,
      };
  
      this.notificationService.openNotification(
        notification,
        'saw-notification-success'
      );
    }

    onViewDetail() {
      this.dialogService.openSideDialog(ShipmentInfoComponent);
    }


}
