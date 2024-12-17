import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { Countries } from '@core/jsons/countries-states-cities.json';
import { Addresses } from '@core/jsons/customer-address.json';
import { FormStateService } from '@core/services/form-state.service';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit, OnDestroy {
  pickupForm: FormGroup;
  deliveryForm: FormGroup;

  customerAddress = Addresses;
  countries = Countries;
  states: {id: number, name: string, cities: {id: number, name: string}[]}[] = [];
  cities: {id: number, name: string}[] = [];
  deliveryStates: {id: number, name: string, cities: {id: number, name: string}[]}[] = [];
  deliveryCities: {id: number, name: string}[] = [];

  @Output() emitNextStep: EventEmitter<{step: number, isValid: boolean}> = new EventEmitter<{step: number, isValid: boolean}>();

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService
  ) { }

  ngOnInit(): void {
    this.createForm();

    this.onCountrySelect(161);
  }

  createForm() {
    this.pickupForm = this.formStateService.addressInfoForm || this.fb.group({
      addressId: ['', Validators.required],
      address: ['', Validators.required],
      country: [{value: 161, disabled: true}, Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      contact: [''],
      address2: [''],
      originCharges: [true, Validators.required],
      isResidentialAddress: [false, Validators.required],
      saveSenderInfo: [true, Validators.required],
    });

    this.deliveryForm = this.fb.group({
      addressId: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: [''],
      postalCode: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      contact: [''],
      address2: [''],
      originCharges: [true, Validators.required],
      isResidentialAddress: [false, Validators.required],
      saveSenderInfo: [true, Validators.required],
    });
  }

  get pickupFormControls() {
    return this.pickupForm.controls;
  }

  get deliveryFormControls() {
    return this.deliveryForm.controls;
  }

  getErrorMessage(instance: string) {

  }

  onCountrySelect(event: number) {
    const country = this.countries.find((country: any) => {
      return country.id === event;
    });

    return this.states = country?.states || [];
  }

  onStateSelect(event: MatSelectChange) {
    const state = this.states.find((state: any) => {
      return state.id === event.value;
    });

    return this.cities = state?.cities || [];
  }

  onDelicveryCountrySelect(event: number) {
    const country = this.countries.find((country: any) => {
      return country.id === event;
    });

    return this.deliveryStates = country?.states || [];
  }

  onDeliveryStateSelect(event: MatSelectChange) {
    const state = this.deliveryStates.find((state: any) => {
      return state.id === event.value;
    });

    return this.deliveryCities = state?.cities || [];
  }

  goBack() {
    this.createForm();
  }

  onSubmit() {
    this.emitNextStep.emit({step: 1, isValid: this.pickupForm.valid && this.deliveryForm.valid});

  }

  ngOnDestroy(): void {
    this.formStateService.addressInfoForm = this.pickupForm;
  }

}
