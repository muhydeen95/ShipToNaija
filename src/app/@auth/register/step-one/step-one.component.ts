import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CustomerType } from '@core/enums/auth.enum';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.scss']
})
export class StepOneComponent implements OnInit {
  customerType: number = CustomerType.Individual;
  CustomerTypeEnumEnum = CustomerType;

  @Output() emitCustomerType: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.emitCustomerType.emit(this.CustomerTypeEnumEnum.Individual);

  }

  onChangeCustomer(type: number) {
    this.customerType = type;

    this.emitCustomerType.emit(type);
    
  }

}
