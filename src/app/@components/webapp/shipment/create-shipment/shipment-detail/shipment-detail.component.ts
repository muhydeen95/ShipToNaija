import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddBoxItemComponent } from './dialogs/add-box-item/add-box-item.component';
import { MatDialog } from '@angular/material/dialog';
import { Warehouses } from '@core/jsons/warehouse.json';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.component.html',
  styleUrls: ['./shipment-detail.component.scss']
})
export class ShipmentDetailComponent implements OnInit {
  step: number = 1;
  shipemntForm: FormGroup;

  types: {id: number, name: string}[] = [
    {id: 1, name: 'Pick up'},
    {id: 2, name: 'Drop off'},
  ];

  measurementTypes: {id: number, name: string}[] = [
    {id: 1, name: 'Kg/cm'},
    {id: 2, name: 'Ft/Inch'},
  ];

  warehouses = Warehouses

  @Output() emitPrevStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() emitNextStep: EventEmitter<{step: number, isValid: boolean}> = new EventEmitter<{step: number, isValid: boolean}>();

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.createForm();

  }

  createForm() {
    this.shipemntForm = this.fb.group({
      type: ['', Validators.required],
      warehouse: ['', Validators.required],
      unit: ['', Validators.required],
      showShipmentDimension: [true, Validators.required],
      boxes: this.fb.array([])
    })
  }

  get shipemntFormControls() {
    return this.shipemntForm.controls;
  }

  get boxes(): FormArray {
    return this.shipemntForm.get('boxes') as FormArray;
  }

  addBox(): void {
    const boxGroup = this.fb.group({
      id: [0, Validators.required],
      length: ['', Validators.required],
      height: ['', Validators.required],
      widthCm: ['', Validators.required],
      widthKg: ['', Validators.required],
      items: this.fb.array([])
    });

    this.boxes.push(boxGroup);
  }

  removeBox(index: number): void {
    this.boxes.removeAt(index);
  }

  getItems(boxIndex: number): FormArray {
    return this.boxes.at(boxIndex).get('items') as FormArray;
  }

  addItem(boxIndex: number, name?: string): void {
    const items = this.getItems(boxIndex);

    const itemGroup = this.fb.group({
      name: [name ?? '', Validators.required],
    });

    items.push(itemGroup);
  }

  removeItem(boxIndex: number, itemIndex: number): void {
    const items = this.getItems(boxIndex);
    items.removeAt(itemIndex);
  }

  getErrorMessage(instance: string) {

  }

  onAddItem(boxIndex: number) {
    const dialogRef = this.dialog.open(AddBoxItemComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: 'item-dialog',
      backdropClass: 'saw-dialog-backdrop',
    });

    dialogRef.componentInstance.eventEmitter.subscribe((event: string) => {
      if (event) {
        this.addItem(boxIndex, event)
      }
    });
  }

  goBack(step: number) {
    if(step === 2) {
      this.step = step - 1;
    } else {
      this.emitPrevStep.emit(2);

    }
  }

  onSubmit(step: number) {
    if(step === 1) {
      this.step = step + 1;

    } else {
      this.emitNextStep.emit({step: this.step, isValid: this.shipemntForm.valid});

    }
  }

}
