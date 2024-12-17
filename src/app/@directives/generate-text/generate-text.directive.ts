import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[generateText]',
})
export class GenerateTextDirective implements OnInit {
  @Input() textData: { [key: string]: string | null }[] | undefined;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.textData) {
      (this.textData as Array<any>).forEach((el: any) => {
        if (Object.keys(el)[0] === 'normal') {
          const span = document.createElement('span');

          span.innerText = `${Object.values(el)[0]} `;

          this.renderer.appendChild(this.elementRef.nativeElement, span);
        } else if (Object.keys(el)[0] === 'gradient') {
          const span = document.createElement('span');

          span.classList.add('saw-text-linear-gradient');

          span.innerText = `${Object.values(el)[0]} `;

          this.renderer.appendChild(this.elementRef.nativeElement, span);
        }
      });
    }
  }
}
