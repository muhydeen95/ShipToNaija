import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sawDotStatus]',
})
export class DotStatusDirective implements OnInit {
  @Input() colorStatus!: string | number | boolean;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const className = this.resolveClassName();

    this.renderer.addClass(this.elementRef.nativeElement, className);
  }

  resolveClassName() {
    switch (this.colorStatus) {
      case 1:
      case 'Approved':
      case true:
        return 'dot-primary';

      case 'Pending':
        return 'warning';

      case 'Rejected':
      case 'Expired':
      case 'Returned':
        return 'dot-error';

      default:
        return 'neutral';
    }
  }

}
