import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sawStatus]',
})
export class StatusDirective implements OnInit {
  @Input() colorStatus!: string | number | boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const className = this.resolveClassName();

    this.renderer.addClass(this.elementRef.nativeElement, className);
  }

  resolveClassName() {
    switch (this.colorStatus) {
      case 1:
      case 'Active':
      case 'Success':
      case 'Delivered':
      case 'Paid':
      case true:
        return 'primary';

      case 'Pending':
      case 'ProcessingPayment':
      case 'Processing':
      case 'In Transit':
      case 'Unpaid':
        return 'warning';

      case 3:
      case 'Inactive':
      case 'Cancelled':
      case 'Draft':
      case false:
        return 'neutral';

      case 'primary':
      case 'Ongoing':
      case 'Sorting':
        return 'info';

      case 'Failed':
      case 'Expired':
      case 'Returned':
        return 'error';

      default:
        return 'neutral';
    }
  }

}
