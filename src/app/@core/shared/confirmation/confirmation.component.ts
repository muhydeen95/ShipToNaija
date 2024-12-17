import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent {
  @Output() eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { header: string; text: string; action: string },
    public dialogRef: MatDialogRef<ConfirmationComponent>
  ) {}

  onContinue() {
    this.eventEmitter.emit(true);
    this.dialogRef.close();
  }

  closeDialog = () => this.dialogRef.close();
}
