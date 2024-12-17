import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-svg',
  template: '',
  styles: [
    `
      :host {
        // display: block;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
  ],
})
export class SvgComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  @Input() src!: string;
  @Input() svgClass!: string;
  @Input() svgId!: string;
  @Input() svgPathFill!: string;
  @Input() svgPathStroke!: string;
  @Input() svgRectFill!: string | null;
  @Input() svgCircleFill!: string;
  @Input() svgCircleStroke!: string;
  @Input() svgWidth!: string;

  @HostBinding('innerHTML') innerHTML: SafeHtml;

  constructor(
    private elementRef: ElementRef,
    private http: HttpClient,
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    if (this.src) {
      this.subscription.add(
        this.http.get(this.src, { responseType: 'text' }).subscribe((svg) => {
          this.renderer.setProperty(
            this.elementRef.nativeElement,
            'innerHTML',
            this.sanitizer.bypassSecurityTrustHtml(svg)
          );

          const svgElement = (this.elementRef.nativeElement as HTMLElement)
            .firstElementChild;

          // this.renderer.setStyle(svgElement, 'max-width', '100%');

          if (this.svgWidth) {
            this.renderer.setStyle(svgElement, 'width', this.svgWidth);
          }

          if (this.svgClass) {
            this.renderer.setAttribute(svgElement, 'class', this.svgClass);
          }

          if (this.svgId) {
            this.renderer.setAttribute(svgElement, 'id', this.svgId);
          }

          if (this.svgPathFill) {
            Array.from(svgElement!.children).forEach((el) => {
              if (el.tagName === 'path') {
                this.renderer.setAttribute(el, 'fill', this.svgPathFill);
              }
            });
          }

          if (this.svgPathStroke) {
            Array.from(svgElement!.children).forEach((el) => {
              if (el.tagName === 'path') {
                this.renderer.setAttribute(el, 'stroke', this.svgPathStroke);
              }
            });
          }

          if (this.svgRectFill) {
            Array.from(svgElement!.children).forEach((el) => {
              if (el.tagName === 'rect') {
                this.renderer.setAttribute(el, 'fill', this.svgRectFill!);
              }
            });
          }

          if (this.svgCircleFill) {
            Array.from(svgElement!.children).forEach((el) => {
              if (el.tagName === 'circle') {
                this.renderer.setAttribute(el, 'fill', this.svgCircleFill!);
              }
            });
          }

          if (this.svgCircleStroke) {
            Array.from(svgElement!.children).forEach((el) => {
              if (el.tagName === 'circle') {
                this.renderer.setAttribute(el, 'stroke', this.svgCircleStroke!);
              }
            });
          }

          this.innerHTML = this.sanitizer.bypassSecurityTrustHtml(
            svgElement!.outerHTML
          );
        })
      );
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
