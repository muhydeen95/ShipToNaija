import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.scss']
})
export class FilterDialogComponent implements OnInit {
  filterForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<FilterDialogComponent>,
  ) {}

  ngOnInit(): void {
    this.initcircularsForm();

  }

  public initcircularsForm(): void {
    this.filterForm = this.fb.group({

    });
  }


  submit() {

  }

  closeDialog = () => this.dialogRef.close();
}
