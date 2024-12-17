import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShipmentStep } from '@core/enums/shipment.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-shipment',
  templateUrl: './create-shipment.component.html',
  styleUrls: ['./create-shipment.component.scss']
})
export class CreateShipmentComponent implements OnInit {
  step: number = 1;
  isStepOneValid: boolean;
  isStepTwoValid: boolean;
  query: 'import' | 'export' = 'export';

  shipmentStep = ShipmentStep;

  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listenToActivatedRouteSubscription();

  }

  listenToActivatedRouteSubscription() {
    this.subscription.add(
      this.route.queryParams.subscribe((params: Params) => {
        if (params?.q) {
          this.query = params?.q;
        }

      })
    );
  }

  goBack(step: number) {
   ( step !== this.shipmentStep.ADDRESS) ? this.step = step - this.shipmentStep.ADDRESS : null;

  }

  onSubmit(data: {step: number, isValid: boolean}) {
    ( data.step !== this.shipmentStep.SUMMARY) ? this.step = data.step + this.shipmentStep.ADDRESS : null;

    if(data.step === this.shipmentStep.ADDRESS) {
      this.isStepOneValid = data.isValid;

    } 

    if(data.step === this.shipmentStep.DETAILS) {
      this.isStepTwoValid = data.isValid;
      
    }
  }

}
