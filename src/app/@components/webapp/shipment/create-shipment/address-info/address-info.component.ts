import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import * as fromApp from '@store/app/app.reducer';
import * as CountryActions from '@store/country/country.actions';
import * as CountrySelectors from '@store/country/country.selectors';
import { Addresses } from '@core/jsons/customer-address.json';
import { Countries } from '@core/jsons/countries-states-cities.json';
import { FormStateService } from '@core/services/form-state.service';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-address-info',
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit, OnDestroy {
  pickupForm: FormGroup;
  deliveryForm: FormGroup;

  isFetching!: Observable<boolean>;

  customerAddress = Addresses;
  countries: any[];
  jsonCountries = Countries;
  stateMap: { [key: number | string]: any[] } = {};
  cityMap: { [key: number | string]: any[] } = {};
  cities: {id: number, name: string}[] = [];
  deliveryStates: {id: number, name: string, cities: {id: number, name: string}[]}[] = [];
  deliveryCities: {id: number, name: string}[] = [];

  currentCountryIndex: string;
  currentStateIndex: string;

  @Output() emitNextStep: EventEmitter<{step: number, isValid: boolean}> = new EventEmitter<{step: number, isValid: boolean}>();

  private subscription: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private formStateService: FormStateService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.isFetching = this.store.pipe(select(CountrySelectors.getIsFetching));

    this.createForm();

    this.manageCountries();

  }

  getCountries() {
    this.store.dispatch(CountryActions.GetAllCountriesAndStates());
  }

  manageCountries() {
    this.store.dispatch(CountryActions.IsFetching({ payload: true }));

    this.getCountries();

    this.subscription.add(
      this.store
        .pipe(select(CountrySelectors.GetAllCountries))
        .subscribe((resData: any) => {
          if (resData !== null) {
            this.countries = resData;

            this.onSelectCountry('Nigeria', 'pickup');

          }
        })
    );
  }

  onSelectCountry(event: string, index: string) {
    this.currentCountryIndex = index;

    const state = this.countries.find((state: any) => {
      return state.name === event;
    });

    return this.stateMap[this.currentCountryIndex] = state.states;
  }

  getStateCities(country: string, state: string) {
    this.store.dispatch(
      CountryActions.GetCitiesByState({
        payload: {
          country,
          state
        },
      })
    );
  }

  manageStateCities(
    country: string,
    state: string, 
    index: string
  ) {
    this.currentStateIndex = index;

    const selectedCountry: any = this.jsonCountries.find((c: any) => {return c.name === country})

    const selectedState: any = selectedCountry?.states.find((s: any) => {return s.name == state})

    return this.cityMap[this.currentStateIndex] = selectedState?.cities;
  }

  createForm() {
    this.pickupForm = this.formStateService.addressInfoForm || this.fb.group({
      addressId: ['', Validators.required],
      address: ['', Validators.required],
      country: [{value: 'Nigeria', disabled: true}, Validators.required],
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

  onAddressChange(id: number, instance: 'pickup' | 'delivery') {
    const address = this.customerAddress.find((a: any) => {
      return a.id === id;
    });

    if(instance === 'pickup') {
      this.pickupForm.patchValue({
        address: address?.name
      });
      
    } else {
      this.deliveryForm.patchValue({
        address: address?.name
      })
    }
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
