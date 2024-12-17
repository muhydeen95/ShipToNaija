import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-notice-dialog',
  templateUrl: './notice-dialog.component.html',
  styleUrls: ['./notice-dialog.component.scss']
})
export class NoticeDialogComponent implements OnInit {

  @Output() eventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<NoticeDialogComponent>,
  ) {}

  ngOnInit(): void {}


  submit() {

    this.eventEmitter.emit(true);

    this.closeDialog();
  }

  closeDialog = () => this.dialogRef.close();
}
