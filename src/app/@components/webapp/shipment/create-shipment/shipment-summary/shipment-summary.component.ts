import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NoticeDialogComponent } from '../shipment-detail/dialogs/notice-dialog/notice-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shipment-summary',
  templateUrl: './shipment-summary.component.html',
  styleUrls: ['./shipment-summary.component.scss']
})
export class ShipmentSummaryComponent implements OnInit {

  @Output() emitPrevStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() emitNextStep: EventEmitter<{step: number, isValid: boolean}> = new EventEmitter<{step: number, isValid: boolean}>();

  constructor(
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onNoticeDialog() {
    const dialogRef = this.dialog.open(NoticeDialogComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: 'notice-dialog',
      backdropClass: 'saw-dialog-backdrop',
    });

    dialogRef.componentInstance.eventEmitter.subscribe((event: string) => {
      if (event) {
        this.router.navigate(['/app/shipment'])
      }
    });
  }
  
  goBack() {
    this.emitPrevStep.emit(3);
    
  }

  onSubmit() {
    this.onNoticeDialog();

  }

}
