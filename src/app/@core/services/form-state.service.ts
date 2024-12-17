import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})

export class FormStateService {
  addressInfoForm: FormGroup | null = null;
  shipmentDetailForm: FormGroup | null = null;
}
