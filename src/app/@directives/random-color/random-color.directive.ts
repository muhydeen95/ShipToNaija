import {
  AfterContentInit,
  Directive,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[randomColor]',
})
export class RandomColorDirective implements AfterContentInit {
  @Input() color: boolean = false;
  @Input() backgroundColor: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterContentInit(): void {
    if (this.color === true) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'color',
        this.randomColor()
      );
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#ffffff');
    }

    if (this.backgroundColor === true) {
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'background-color',
        this.randomColor()
      );
    }
  }

  randomColor() {
    const value =
      '#' + // start with a leading hash
      Math.random() // generates random number
        .toString(16) // changes that number to base 16 as a string
        .substr(2, 6); // gets 6 characters and excludes the leading "0."

    return value;
  }
}
