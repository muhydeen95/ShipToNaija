import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-box-item',
  templateUrl: './add-box-item.component.html',
  styleUrls: ['./add-box-item.component.scss']
})
export class AddBoxItemComponent implements OnInit {
  form: FormGroup;

  @Output() eventEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<AddBoxItemComponent>,
  ) {}

  ngOnInit(): void {
    this.initcircularsForm();

  }

  public initcircularsForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
    });
  }


  submit() {
    const payload = this.form.value;

    this.eventEmitter.emit(payload.name);

    this.closeDialog();
  }

  closeDialog = () => this.dialogRef.close();
}
