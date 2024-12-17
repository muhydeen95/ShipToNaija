import { Directive } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';

const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'Do of MMMM',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Directive({
  selector: '[dateFormat]',
  providers: [
    /**By default the MomentDateAdapter creates dates in your time zone specific locale.
     *  You can change the default behaviour to parse dates as UTC
     *  by providing the MAT_MOMENT_DATE_ADAPTER_OPTIONS and setting it to useUtc: true.**/
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    /*************************************************************************************/

    /************************To use custom date format************************/
    {
      provide: MAT_DATE_FORMATS,
      useValue: CUSTOM_DATE_FORMATS,
    } /*************************************************************************/,
  ],
})
export class DateFormatDirective {
  // @Input() dateFormatOptions!: {
  //   parse: {
  //     dateInput: any;
  //   };
  //   display: {
  //     dateInput: any;
  //     monthLabel?: any;
  //     monthYearLabel: any;
  //     dateA11yLabel: any;
  //     monthYearA11yLabel: any;
  //   };
  // };

  constructor() {}
}
